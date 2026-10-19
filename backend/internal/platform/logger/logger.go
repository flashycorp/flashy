// Package logger builds the structured application logger.
package logger

import (
	"log/slog"
	"os"
	"strings"
)

func New(level, format string) *slog.Logger {
	var lvl slog.Level
	_ = lvl.UnmarshalText([]byte(strings.ToUpper(level)))

	opts := &slog.HandlerOptions{Level: lvl}
	if format == "json" {
		return slog.New(slog.NewJSONHandler(os.Stdout, opts))
	}
	return slog.New(slog.NewTextHandler(os.Stdout, opts))
}
