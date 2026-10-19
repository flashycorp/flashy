{{- define "flashy.image" -}}
{{- if .registry }}{{ .registry }}/{{ end }}{{ .image }}:{{ .tag }}
{{- end -}}

{{- define "flashy.labels" -}}
app.kubernetes.io/part-of: flashy
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}
