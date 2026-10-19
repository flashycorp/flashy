// Package config loads application settings from environment variables.
package config

import (
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Env                string
	Port               string
	LogLevel           string
	LogFormat          string
	DatabaseURL        string
	RedisURL           string
	JWTSecret          string
	JWTTTLMinutes      int
	CORSAllowedOrigins []string
}

func Load() Config {
	return Config{
		Env:                getEnv("APP_ENV", "local"),
		Port:               getEnv("APP_PORT", "8080"),
		LogLevel:           getEnv("LOG_LEVEL", "info"),
		LogFormat:          getEnv("LOG_FORMAT", "text"),
		DatabaseURL:        getEnv("DATABASE_URL", ""),
		RedisURL:           getEnv("REDIS_URL", "redis://localhost:6379/0"),
		JWTSecret:          getEnv("JWT_SECRET", ""),
		JWTTTLMinutes:      getEnvInt("JWT_TTL_MINUTES", 60),
		CORSAllowedOrigins: strings.Split(getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000"), ","),
	}
}

func getEnv(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok {
		return v
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	if v, err := strconv.Atoi(os.Getenv(key)); err == nil {
		return v
	}
	return fallback
}
