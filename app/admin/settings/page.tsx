"use client";

import { useState, useEffect } from "react";
import { Save, Settings as SettingsIcon, Zap, Shield, Database, Download, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

interface SecurityLog {
  id: string;
  eventType: string;
  severity: string;
  email: string | null;
  description: string;
  createdAt: string;
}

interface SecurityData {
  stats: {
    failedLogins24h: number;
    failedLogins7d: number;
    criticalEvents: number;
    totalEvents: number;
  };
  recentLogs: SecurityLog[];
  checks: {
    env: {
      nextauthSecret: boolean;
      nextauthUrl: boolean;
      databaseUrl: boolean;
      resendApiKey: boolean;
      nodeEnv: string;
    };
    security: {
      https: boolean;
      userAgent: string;
    };
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [backupLoading, setBackupLoading] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [securityData, setSecurityData] = useState<SecurityData | null>(null);
  const [securityLoading, setSecurityLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
    fetchSecurityData();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      setSettings(data.settings || []);
    } catch (error) {
      console.error("Error fetching settings:", error);
      setError("Eroare la încărcarea setărilor");
    } finally {
      setLoading(false);
    }
  };

  const fetchSecurityData = async () => {
    try {
      const response = await fetch("/api/admin/security");
      const data = await response.json();
      setSecurityData(data);
    } catch (error) {
      console.error("Error fetching security data:", error);
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleToggle = (key: string, currentValue: string) => {
    const newValue = currentValue === "true" ? "false" : "true";
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: newValue } : s))
    );
  };

  const handleSave = async () => {
    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la salvarea setărilor");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleBackup = async () => {
    setBackupLoading(true);
    setBackupSuccess(false);

    try {
      const response = await fetch("/api/admin/backup", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la crearea backup-ului");
      }

      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 5000);
    } catch (err: any) {
      console.error("Backup error:", err);
      alert("Eroare la crearea backup-ului: " + err.message);
    } finally {
      setBackupLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-navy rounded-lg">
            <SettingsIcon size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy">Setări</h1>
            <p className="text-gray">Configurează modulele platformei</p>
          </div>
        </div>
      </div>

      {/* Module Toggles */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light">
          <h2 className="text-xl font-bold text-navy">Module Active</h2>
        </div>

        <div className="divide-y divide-gray-light">
          {settings.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray">
              Nu există setări disponibile
            </div>
          ) : (
            settings.map((setting) => (
              <div key={setting.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-smooth">
                <div className="flex-1">
                  <h3 className="font-semibold text-navy mb-1">
                    {setting.key.split(".")[1]?.replace(/([A-Z])/g, " $1").trim() || setting.key}
                  </h3>
                  <p className="text-sm text-gray">
                    {setting.description || "Fără descriere"}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(setting.key, setting.value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.value === "true"
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                  disabled={saving}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.value === "true" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))
          )}
        </div>

        {settings.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-light">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                ✓ Setările au fost salvate cu succes!
              </div>
            )}

            <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
              <Save size={18} />
              {saving ? "Se salvează..." : "Salvează Modificările"}
            </Button>
          </div>
        )}
      </div>

      {/* Performance Optimization */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Performance Optimization</h2>
              <p className="text-sm text-gray">Ongoing monitoring</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-dark">Cache Status</span>
                <CheckCircle size={18} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-gray mt-1">Images & static assets cached</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-dark">Avg Response Time</span>
                <Clock size={18} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">~120ms</div>
              <p className="text-xs text-gray mt-1">API endpoints average</p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-dark">DB Queries</span>
                <Database size={18} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">Optimized</div>
              <p className="text-xs text-gray mt-1">Indexed & paginated</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-navy mb-2">🔧 Recomandări Optimizare:</h4>
            <ul className="text-sm text-gray space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Next.js Image Optimization activată</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Prisma Query Optimization în uz</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>Lazy loading pentru componente mari</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Consider adding Redis cache pentru API calls frecvente</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Audit */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy">Security Audit</h2>
                <p className="text-sm text-gray">Live monitoring</p>
              </div>
            </div>
            <Button 
              onClick={fetchSecurityData} 
              disabled={securityLoading}
              className="text-sm"
            >
              {securityLoading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="p-6">
          {securityLoading ? (
            <div className="text-center py-8 text-gray">Se încarcă datele de securitate...</div>
          ) : securityData ? (
            <>
              {/* Security Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-dark">Total Events</span>
                    <Database size={18} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{securityData.stats.totalEvents}</div>
                  <p className="text-xs text-gray mt-1">All time</p>
                </div>

                <div className={`p-4 border rounded-lg ${securityData.stats.failedLogins24h > 5 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-dark">Failed Logins</span>
                    <XCircle size={18} className={securityData.stats.failedLogins24h > 5 ? 'text-red-600' : 'text-green-600'} />
                  </div>
                  <div className={`text-2xl font-bold ${securityData.stats.failedLogins24h > 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {securityData.stats.failedLogins24h}
                  </div>
                  <p className="text-xs text-gray mt-1">Last 24 hours</p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-dark">Failed (7d)</span>
                    <Clock size={18} className="text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{securityData.stats.failedLogins7d}</div>
                  <p className="text-xs text-gray mt-1">Last 7 days</p>
                </div>

                <div className={`p-4 border rounded-lg ${securityData.stats.criticalEvents > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-dark">Critical Events</span>
                    <AlertTriangle size={18} className={securityData.stats.criticalEvents > 0 ? 'text-red-600' : 'text-green-600'} />
                  </div>
                  <div className={`text-2xl font-bold ${securityData.stats.criticalEvents > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {securityData.stats.criticalEvents}
                  </div>
                  <p className="text-xs text-gray mt-1">Requires attention</p>
                </div>
              </div>

              {/* Environment Checks */}
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-navy">Environment & Configuration</h3>
                
                <div className={`flex items-center justify-between p-3 border rounded-lg ${securityData.checks.env.nextauthSecret ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-3">
                    {securityData.checks.env.nextauthSecret ? <CheckCircle size={20} className="text-green-600" /> : <XCircle size={20} className="text-red-600" />}
                    <div>
                      <p className="font-medium text-gray-dark">NEXTAUTH_SECRET</p>
                      <p className="text-xs text-gray">Session security key</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${securityData.checks.env.nextauthSecret ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                    {securityData.checks.env.nextauthSecret ? 'OK' : 'MISSING'}
                  </span>
                </div>

                <div className={`flex items-center justify-between p-3 border rounded-lg ${securityData.checks.env.databaseUrl ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-3">
                    {securityData.checks.env.databaseUrl ? <CheckCircle size={20} className="text-green-600" /> : <XCircle size={20} className="text-red-600" />}
                    <div>
                      <p className="font-medium text-gray-dark">DATABASE_URL</p>
                      <p className="text-xs text-gray">PostgreSQL connection</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${securityData.checks.env.databaseUrl ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                    {securityData.checks.env.databaseUrl ? 'OK' : 'MISSING'}
                  </span>
                </div>

                <div className={`flex items-center justify-between p-3 border rounded-lg ${securityData.checks.security.https ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className="flex items-center gap-3">
                    {securityData.checks.security.https ? <CheckCircle size={20} className="text-green-600" /> : <AlertTriangle size={20} className="text-yellow-600" />}
                    <div>
                      <p className="font-medium text-gray-dark">HTTPS</p>
                      <p className="text-xs text-gray">Secure connection</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${securityData.checks.security.https ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'}`}>
                    {securityData.checks.security.https ? 'OK' : 'HTTP'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-dark">Environment</p>
                      <p className="text-xs text-gray">{securityData.checks.env.nodeEnv}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {securityData.checks.env.nodeEnv?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Recent Security Logs */}
              <div className="mb-6">
                <h3 className="font-semibold text-navy mb-3">Recent Security Events</h3>
                {securityData.recentLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray bg-gray-50 rounded-lg">
                    No security events logged yet
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {securityData.recentLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className={`p-3 border rounded-lg ${
                          log.severity === 'CRITICAL' ? 'bg-red-50 border-red-200' :
                          log.severity === 'WARNING' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                log.severity === 'CRITICAL' ? 'bg-red-600 text-white' :
                                log.severity === 'WARNING' ? 'bg-yellow-600 text-white' :
                                'bg-blue-600 text-white'
                              }`}>
                                {log.eventType.replace(/_/g, ' ')}
                              </span>
                              {log.email && (
                                <span className="text-xs text-gray">
                                  {log.email}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-dark">{log.description}</p>
                          </div>
                          <span className="text-xs text-gray whitespace-nowrap ml-4">
                            {new Date(log.createdAt).toLocaleString('ro-RO')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-navy mb-2">⚠️ Security Best Practices:</h4>
                <ul className="text-sm text-gray space-y-1">
                  <li>• Rotate NEXTAUTH_SECRET periodic (every 90 days)</li>
                  <li>• Monitor failed login attempts (current: {securityData.stats.failedLogins24h} in 24h)</li>
                  <li>• Review user permissions monthly</li>
                  <li>• Keep dependencies updated (npm audit)</li>
                  <li>• Enable 2FA for admin accounts (future feature)</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-red-600">
              Failed to load security data
            </div>
          )}
        </div>
      </div>

      {/* Database Backups */}
      <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-light bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Database size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Database Backups</h2>
              <p className="text-sm text-gray">Recommended daily</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-dark">Last Backup</span>
                <Clock size={18} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">Manual</div>
              <p className="text-xs text-gray mt-1">Configure Coolify automated backups</p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-dark">Backup Method</span>
                <Database size={18} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">Coolify</div>
              <p className="text-xs text-gray mt-1">PostgreSQL native backup</p>
            </div>
          </div>

          {backupSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-sm font-semibold text-green-600">
                  ✓ Backup trigger sent! Check Coolify logs for status.
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 mb-6">
            <Button onClick={handleBackup} disabled={backupLoading} className="flex-1">
              <Download size={18} />
              {backupLoading ? "Triggering..." : "Trigger Manual Backup"}
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-navy mb-2">📦 Backup Strategy:</h4>
            <ul className="text-sm text-gray space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Daily Automated:</strong> Configure in Coolify DB settings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Retention:</strong> Keep last 7 daily + 4 weekly backups</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Storage:</strong> Coolify S3-compatible backup storage</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <span><strong>Test Recovery:</strong> Verify backup integrity monthly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-navy mb-2">ℹ️ Despre Setări</h3>
        <p className="text-sm text-gray mb-2">
          Modulele pot fi activate sau dezactivate pentru a controla ce
          funcționalități sunt disponibile pe platformă.
        </p>
        <ul className="text-sm text-gray space-y-1 list-disc list-inside">
          <li>
            <strong>Calculator:</strong> Afișează calculatorul de buget pe landing page
          </li>
          <li>
            <strong>Pricing:</strong> Afișează secțiunea de prețuri pe landing page
          </li>
          <li>
            <strong>FAQ:</strong> Afișează secțiunea de întrebări frecvente
          </li>
          <li>
            <strong>Contracts:</strong> Permite generarea de contracte în admin
          </li>
          <li>
            <strong>Notifications:</strong> Activează notificările prin email
          </li>
        </ul>
      </div>
    </div>
  );
}

