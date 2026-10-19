// Package srs implements the spaced repetition scheduling algorithm.
package srs

import "time"

type Grade string

const (
	Again Grade = "again"
	Hard  Grade = "hard"
	Good  Grade = "good"
	Easy  Grade = "easy"
)

// initialIntervals are the first-review intervals from the requirements spec.
var initialIntervals = map[Grade]time.Duration{
	Again: 5 * time.Minute,
	Hard:  15 * time.Minute,
	Good:  time.Hour,
	Easy:  4 * 24 * time.Hour,
}

// NextReview returns when a new card should be shown again after the given grade.
func NextReview(now time.Time, g Grade) time.Time {
	return now.Add(initialIntervals[g])
}
