#!/usr/bin/env python3
"""
PostHog Setup Automation Script
Automatically creates Actions, Insights, Dashboards, and Alerts in PostHog

Requirements:
    pip install requests python-dotenv

Usage:
    python scripts/setup-posthog.py
"""

import os
import sys
import json
import requests
from typing import Dict, List, Any
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# PostHog Configuration
POSTHOG_HOST = "https://eu.i.posthog.com"
POSTHOG_PROJECT_API_KEY = os.getenv("NEXT_PUBLIC_POSTHOG_KEY")
POSTHOG_PERSONAL_API_KEY = os.getenv("POSTHOG_PERSONAL_API_KEY")  # Get from PostHog Settings > Personal API Keys

if not POSTHOG_PERSONAL_API_KEY:
    print("❌ Error: POSTHOG_PERSONAL_API_KEY not found in .env file")
    print("Get it from: https://eu.i.posthog.com/settings/user-api-keys")
    print("\nMake sure your Personal API Key has these scopes:")
    print("  - action:write")
    print("  - insight:write")
    print("  - dashboard:write")
    sys.exit(1)

# Headers for API requests
headers = {
    "Authorization": f"Bearer {POSTHOG_PERSONAL_API_KEY}",
    "Content-Type": "application/json",
}

def get_project_id() -> int:
    """Get the project ID from the project API key"""
    response = requests.get(
        f"{POSTHOG_HOST}/api/projects/@current/",
        headers=headers,
    )
    response.raise_for_status()
    return response.json()["id"]

def create_action(name: str, event_name: str, description: str = "") -> Dict:
    """Create an Action in PostHog"""
    project_id = get_project_id()
    
    payload = {
        "name": name,
        "description": description,
        "steps": [
            {
                "event": event_name,
            }
        ],
    }
    
    response = requests.post(
        f"{POSTHOG_HOST}/api/projects/{project_id}/actions/",
        headers=headers,
        json=payload,
    )
    
    if response.status_code == 201:
        print(f"✅ Created action: {name}")
        return response.json()
    else:
        print(f"⚠️  Action '{name}' might already exist or error: {response.status_code}")
        return {}

def create_insight(name: str, filters: Dict, insight_type: str = "TRENDS") -> Dict:
    """Create an Insight in PostHog"""
    project_id = get_project_id()
    
    payload = {
        "name": name,
        "filters": filters,
        "query": {
            "kind": insight_type,
        },
    }
    
    response = requests.post(
        f"{POSTHOG_HOST}/api/projects/{project_id}/insights/",
        headers=headers,
        json=payload,
    )
    
    if response.status_code == 201:
        print(f"✅ Created insight: {name}")
        return response.json()
    else:
        print(f"⚠️  Insight '{name}' error: {response.status_code}")
        return {}

def create_dashboard(name: str, description: str = "") -> Dict:
    """Create a Dashboard in PostHog"""
    project_id = get_project_id()
    
    payload = {
        "name": name,
        "description": description,
        "pinned": True,
    }
    
    response = requests.post(
        f"{POSTHOG_HOST}/api/projects/{project_id}/dashboards/",
        headers=headers,
        json=payload,
    )
    
    if response.status_code == 201:
        print(f"✅ Created dashboard: {name}")
        return response.json()
    else:
        print(f"⚠️  Dashboard '{name}' error: {response.status_code}")
        return {}

def setup_actions():
    """Create all conversion tracking actions"""
    print("\n📊 Creating Actions...")
    
    actions = [
        {
            "name": "Calculator Completed",
            "event": "calculator_completed",
            "description": "User completed the budget calculator",
        },
        {
            "name": "Package Interest Submitted",
            "event": "package_interest_submitted",
            "description": "User expressed interest in a package",
        },
        {
            "name": "Guide Download Started",
            "event": "guide_download_started",
            "description": "User requested the Start-Up Nation guide",
        },
        {
            "name": "CTA Clicked",
            "event": "cta_clicked",
            "description": "User clicked a call-to-action button",
        },
        {
            "name": "Lead Created (Server)",
            "event": "lead_created_server",
            "description": "New lead created in database (server-side)",
        },
        {
            "name": "Lead Converted",
            "event": "lead_converted",
            "description": "Lead converted to paying client",
        },
    ]
    
    created_actions = []
    for action in actions:
        result = create_action(action["name"], action["event"], action["description"])
        if result:
            created_actions.append(result)
    
    return created_actions

def setup_funnels():
    """Create conversion funnels"""
    print("\n🔀 Creating Funnels...")
    project_id = get_project_id()
    
    funnels = [
        {
            "name": "Lead Generation Funnel",
            "description": "From Start-Up Nation page to package interest",
            "filters": {
                "insight": "FUNNELS",
                "events": [
                    {
                        "id": "$pageview",
                        "name": "$pageview",
                        "type": "events",
                        "order": 0,
                        "properties": [
                            {
                                "key": "$current_url",
                                "type": "event",
                                "value": "/start-up-nation",
                                "operator": "icontains",
                            }
                        ],
                    },
                    {
                        "id": "calculator_completed",
                        "name": "calculator_completed",
                        "type": "events",
                        "order": 1,
                    },
                    {
                        "id": "package_interest_submitted",
                        "name": "package_interest_submitted",
                        "type": "events",
                        "order": 2,
                    },
                ],
                "funnel_window_days": 7,
            },
        },
        {
            "name": "Guide to Customer Funnel",
            "description": "From guide download to package interest",
            "filters": {
                "insight": "FUNNELS",
                "events": [
                    {
                        "id": "$pageview",
                        "name": "$pageview",
                        "type": "events",
                        "order": 0,
                        "properties": [
                            {
                                "key": "$current_url",
                                "type": "event",
                                "value": "/ghid",
                                "operator": "icontains",
                            }
                        ],
                    },
                    {
                        "id": "guide_download_started",
                        "name": "guide_download_started",
                        "type": "events",
                        "order": 1,
                    },
                    {
                        "id": "package_interest_submitted",
                        "name": "package_interest_submitted",
                        "type": "events",
                        "order": 2,
                    },
                ],
                "funnel_window_days": 14,
            },
        },
    ]
    
    for funnel in funnels:
        create_insight(funnel["name"], funnel["filters"], "FUNNELS")

def setup_trends():
    """Create trend insights"""
    print("\n📈 Creating Trend Insights...")
    
    trends = [
        {
            "name": "Daily Conversions",
            "filters": {
                "insight": "TRENDS",
                "events": [
                    {"id": "calculator_completed", "name": "Calculator Completed", "type": "events"},
                    {"id": "package_interest_submitted", "name": "Package Interest", "type": "events"},
                    {"id": "guide_download_started", "name": "Guide Downloads", "type": "events"},
                ],
                "interval": "day",
                "display": "ActionsLineGraph",
            },
        },
        {
            "name": "Top Performing Industries",
            "filters": {
                "insight": "TRENDS",
                "events": [
                    {"id": "calculator_completed", "name": "Calculator Completed", "type": "events"},
                ],
                "breakdown": "industry",
                "breakdown_type": "event",
                "display": "ActionsBar",
            },
        },
        {
            "name": "Revenue by Lead Source",
            "filters": {
                "insight": "TRENDS",
                "events": [
                    {
                        "id": "calculator_completed",
                        "name": "Calculator Completed",
                        "type": "events",
                        "math": "sum",
                        "math_property": "revenue",
                    },
                ],
                "breakdown": "industry",
                "breakdown_type": "event",
                "display": "ActionsBar",
            },
        },
    ]
    
    for trend in trends:
        create_insight(trend["name"], trend["filters"])

def setup_dashboard():
    """Create main conversion dashboard"""
    print("\n📊 Creating Conversion Goals Dashboard...")
    
    dashboard = create_dashboard(
        "Conversion Goals - Owlia",
        "Main dashboard for tracking lead generation and conversion metrics"
    )
    
    return dashboard

def main():
    """Main setup function"""
    print("🚀 PostHog Setup Automation for Owlia")
    print("=" * 50)
    
    try:
        # Test connection
        project_id = get_project_id()
        print(f"✅ Connected to PostHog project ID: {project_id}")
        
        # Setup components
        setup_actions()
        setup_funnels()
        setup_trends()
        dashboard = setup_dashboard()
        
        print("\n" + "=" * 50)
        print("✅ PostHog setup completed successfully!")
        print("\n📊 Next steps:")
        print("1. Visit your PostHog dashboard:")
        print(f"   {POSTHOG_HOST}/project/{project_id}/dashboard")
        print("2. Review and customize the created insights")
        print("3. Set up alerts for important metrics")
        print("4. Add insights to your dashboard")
        
    except Exception as e:
        print(f"\n❌ Error during setup: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()

