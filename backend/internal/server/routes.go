package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// registerRoutes mounts all API groups. Contract: docs/swagger.yaml.
func (s *Server) registerRoutes() {
	s.engine.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	v1 := s.engine.Group("/v1")
	_ = v1
	// TODO: mount module routes:
	// /auth, /demo, /users, /decks, /cards, /tags, /study, /stats,
	// /catalog, /devices, /admin
}
