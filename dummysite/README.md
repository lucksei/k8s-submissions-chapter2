# Dummy Site Custom Resource Definition (CRD)

> More info about this process in the REAMDE.md from the examples in the course [here](https://github.com/kubernetes-hy/material-example/tree/master/app10-go)

Install kubebuilder and generate CRD files [here](https://book.kubebuilder.io/quick-start)

```sh
curl -L -o kubebuilder "https://go.kubebuilder.io/dl/latest/$(go env GOOS)/$(go env GOARCH)"
chmod +x kubebuilder && sudo mv kubebuilder /usr/local/bin/
```

Init Go inside the `/dummysite/controller` directory and the kubebuilder

```sh
go mod init github.com/lucksei/dummysite/controller
kubebuilder init --domain dwk
```

Create an API for the custom resource

```sh
kubebuilder create api --group stable --version v1 --kind DummySite
```

> The --group and --domain are filled from the PROJECT file, the domain also has to follow the same requirements to work.
> `Group or Domain is invalid: [a DNS-1123 subdomain must consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character (e.g. 'my-name',  or 'abc-123', regex used for validation is '[a-z0-9](?:[-a-z0-9]*[a-z0-9])?(?:\.[a-z0-9](?:[-a-z0-9]*[a-z0-9])?)*')]`

Fill out the CRD like

```go
...
type DummySiteSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file
	// The following markers will use OpenAPI v3 schema to validate the value
	// More info: https://book.kubebuilder.io/reference/markers/crd-validation.html

	// url of the site
	Site string `json:"site"`
	// number of replicas
	Replicas *int32 `json:"replicas,omitempty"`
	// port where the site is exposed
	Port *int32 `json:"port,omitempty"`
}
...
```

Then run `make` & `make manifests`. To test it out run `make run`

Now we write the reconciliation process logic where we create a deployment and a service for the DummySite resource and then apply it to the cluster. This is implemented inside the `internal/controller/dummysite_controller.go` file. By default it comes empty with the following boilerplate code:

> https://book.kubebuilder.io/getting-started

After building the controller we are ready to deploy it to the cluster. Docs [here](https://book.kubebuilder.io/quick-start#run-it-on-the-cluster)

```sh
make docker-build docker-push IMG=lucksei/dummysite-controller:latest
```

```sh
make deploy IMG=lucksei/dummysite-controller:latest
```

To delete & undeploy the CRD from the cluster

```sh
make unistall
make undeploy
```
