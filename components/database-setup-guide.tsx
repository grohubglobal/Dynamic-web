"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Database, CheckCircle, AlertTriangle, XCircle, RefreshCw, Copy, ExternalLink, Lightbulb } from "lucide-react"
import { databaseSetup, type SetupStatus } from "@/lib/database/setup"

export default function DatabaseSetupGuide() {
  const [setupStatus, setSetupStatus] = useState<SetupStatus | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [isCreatingSample, setIsCreatingSample] = useState(false)

  const checkSetup = async () => {
    setIsChecking(true)
    try {
      const status = await databaseSetup.checkSetup()
      setSetupStatus(status)
    } catch (error) {
      console.error("Setup check failed:", error)
    } finally {
      setIsChecking(false)
    }
  }

  const createSampleData = async () => {
    setIsCreatingSample(true)
    try {
      await databaseSetup.createSampleData()
      await checkSetup() // Refresh status
    } catch (error) {
      console.error("Failed to create sample data:", error)
    } finally {
      setIsCreatingSample(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    checkSetup()
  }, [])

  if (!setupStatus) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Checking database setup...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Database Setup Status
            <Button variant="outline" size="sm" onClick={checkSetup} disabled={isChecking} className="ml-auto">
              {isChecking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {isChecking ? "Checking..." : "Refresh"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            {setupStatus.isSetupComplete ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-700">Setup Complete</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Ready to use
                </Badge>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-yellow-700">Setup Required</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  Action needed
                </Badge>
              </>
            )}
          </div>

          {/* Missing Tables */}
          {setupStatus.missingTables.length > 0 && (
            <Alert className="mb-4">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">Missing Tables:</div>
                <div className="flex flex-wrap gap-1">
                  {setupStatus.missingTables.map((table) => (
                    <Badge key={table} variant="destructive" className="text-xs">
                      {table}
                    </Badge>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Errors */}
          {setupStatus.errors.length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">Errors:</div>
                <ul className="list-disc list-inside space-y-1">
                  {setupStatus.errors.map((error, index) => (
                    <li key={index} className="text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Suggestions */}
          {setupStatus.suggestions.length > 0 && (
            <Alert className="mb-4">
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">Suggestions:</div>
                <ul className="list-disc list-inside space-y-1">
                  {setupStatus.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      {!setupStatus.isSetupComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {databaseSetup.getSetupInstructions().map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{instruction}</p>
                    {instruction.includes("NEXT_PUBLIC_SUPABASE") && (
                      <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url")}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key")}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Quick Start</h4>
                <p className="text-sm text-gray-600">Create sample data to test the connection</p>
              </div>
              <Button
                onClick={createSampleData}
                disabled={isCreatingSample || setupStatus.missingTables.length > 0}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isCreatingSample ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Sample Data"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Helpful Links */}
      <Card>
        <CardHeader>
          <CardTitle>Helpful Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://supabase.com/docs/guides/getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <div className="font-medium">Supabase Documentation</div>
                <div className="text-sm text-gray-600">Getting started guide</div>
              </div>
            </a>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <div className="font-medium">Supabase Dashboard</div>
                <div className="text-sm text-gray-600">Manage your project</div>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
