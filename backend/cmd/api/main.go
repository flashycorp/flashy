// Command api starts the Flashy REST API server.
package main

import (
	"log/slog"
	"os"

	"github.com/flashycorp/flashy/backend/internal/config"
	"github.com/flashycorp/flashy/backend/internal/platform/logger"
	"github.com/flashycorp/flashy/backend/internal/server"
)

func main() {
	cfg := config.Load()
	log := logger.New(cfg.LogLevel, cfg.LogFormat)
	slog.SetDefault(log)

	srv := server.New(cfg)
	if err := srv.Run(); err != nil {
		log.Error("server stopped", "err", err)
		os.Exit(1)
	}
}
