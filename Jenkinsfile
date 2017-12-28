node {
  def project = 'predictor-190317'
  def appName = 'predictor-server'
  def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Build image'
  sh("docker build -t ${imageTag} server/.")

  stage 'Push image to registry'
  sh("gcloud docker -- push ${imageTag}")

  stage "Deploy Application"

  sh("sed -i.bak 's#gcr.io/predictor-188521/predictor-server:v45#${imageTag}#' ./server/deployment.yaml")
  sh("kubectl --namespace=production apply -f server/.")
}
