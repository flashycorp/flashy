// Package server wires the HTTP server, middleware and routes.
package server

import (
	"github.com/gin-gonic/gin"

	"github.com/flashycorp/flashy/backend/internal/config"
)

type Server struct {
	cfg    config.Config
	engine *gin.Engine
}

func New(cfg config.Config) *Server {
	if cfg.Env != "local" {
		gin.SetMode(gin.ReleaseMode)
	}
	engine := gin.New()
	engine.Use(gin.Recovery())

	s := &Server{cfg: cfg, engine: engine}
	s.registerRoutes()
	return s
}

func (s *Server) Run() error {
	return s.engine.Run(":" + s.cfg.Port)
}
