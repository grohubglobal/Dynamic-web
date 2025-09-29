"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDatabaseConnection } from "@/hooks/use-database-connection"
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertTriangle, Settings } from "lucide-react"

export default function ConnectionStatus() {
  const { isConnected, isAuthenticated, user, error, lastChecked, reconnect } = useDatabaseConnection()
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [showSetup, setShowSetup] = useState(false)

  const handleReconnect = async () => {
    setIsReconnecting(true)
    try {
      await reconnect()
    } finally {
      setIsReconnecting(false)
    }
  }

  // Show setup guidance if tables are missing
  const needsSetup = error?.includes("Missing tables") || error?.includes("does not exist")

  // Don't show anything if connection is good and no setup needed
  if (isConnected && !error && !needsSetup) {
    return null
  }

  return (
    <div className="fixed top-16 left-4 right-4 z-50 max-w-md mx-auto">
      <Alert variant={needsSetup ? "default" : isConnected ? "default" : "destructive"} className="shadow-lg">
        <div className="flex items-center space-x-2">
          {needsSetup ? (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          ) : isConnected ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}

          <div className="flex-1">
            <AlertDescription>
              {needsSetup ? (
                <div>
                  <div className="font-medium">Database Setup Required</div>
                  <div className="text-sm text-muted-foreground">
                    Some database tables are missing. Click setup to get started.
                  </div>
                </div>
              ) : isConnected ? (
                <div className="flex items-center justify-between">
                  <span>Connected to database</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isAuthenticated ? "default" : "secondary"}>
                      {isAuthenticated ? `Signed in as ${user?.email}` : "Not signed in"}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">Connection lost</div>
                  <div className="text-sm text-muted-foreground">{error || "Unable to connect to database"}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Last checked: {lastChecked.toLocaleTimeString()}
                  </div>
                </div>
              )}
            </AlertDescription>
          </div>

          <div className="flex space-x-2">
            {needsSetup && (
              <Button size="sm" variant="outline" onClick={() => (window.location.href = "/setup")} className="ml-2">
                <Settings className="h-3 w-3 mr-1" />
                Setup
              </Button>
            )}

            {!isConnected && (
              <Button size="sm" variant="outline" onClick={handleReconnect} disabled={isReconnecting} className="ml-2">
                {isReconnecting ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Wifi className="h-3 w-3" />}
                {isReconnecting ? "Connecting..." : "Reconnect"}
              </Button>
            )}
          </div>
        </div>
      </Alert>
    </div>
  )
}
