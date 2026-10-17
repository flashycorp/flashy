package srs

import (
	"testing"
	"time"
)

func TestNextReview(t *testing.T) {
	now := time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC)
	cases := map[Grade]time.Duration{
		Again: 5 * time.Minute,
		Hard:  15 * time.Minute,
		Good:  time.Hour,
		Easy:  96 * time.Hour,
	}
	for g, want := range cases {
		if got := NextReview(now, g).Sub(now); got != want {
			t.Errorf("%s: got %v, want %v", g, got, want)
		}
	}
}
