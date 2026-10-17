# Local dev loop on kind: tilt up
docker_build('flashy-backend', './backend')
docker_build('flashy-frontend', './frontend')

k8s_yaml(helm(
    './deploy/helm/flashy',
    name='flashy',
    values=['./deploy/helm/flashy/values.yaml', './deploy/helm/flashy/values-dev.yaml'],
    set=['ingress.enabled=false', 'backend.autoscaling.enabled=false'],
))

k8s_resource('flashy-backend', port_forwards='8080:8080')
k8s_resource('flashy-frontend', port_forwards='3000:80')
