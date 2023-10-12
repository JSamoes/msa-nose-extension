import React from "react";
import { Accordion, Title } from "@mantine/core";

export default function ValidationTab({
  validation,
}: {
  validation: object;
}) {
  console.log("ValidationTab", validation);
  return (
    <>
    
      <Accordion variant="filled" order={3} py={30} px={20} >
        <Title order={2}>MSA-Nose</Title>
        <p></p>
        <Title order={3}>Microservice Smells</Title>
        <Accordion.Item value="customization-1">
          <Accordion.Control>ESB Usage</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            The microservices communicate via an enterprise service bus (ESB). An ESB is used for connecting microservices.
            <h4>Result</h4>
            {validation["esbContext"]["candidateESBs"].length > 0  ? "An ESB is used for connecting microservices. ❌" : "An ESB is not used for connecting microservices. ✅"}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-2">
          <Accordion.Control>API Versioning</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            APIs are not semantically versioned. A lack of semantically consistent versions of APIs (e.g., v1.1, 1.2, etc.).
            <h4>Result</h4>
            {validation["unversionedAPIContext"]["count"] > 0 ? <p>There are {validation["unversionedAPIContext"]["count"]} unversioned APIs. ❌</p> : "Your APIs are versioned. ✅"}
            {validation["unversionedAPIContext"]["unversionedAPIs"].map((api: any) => { return <p>- {api}</p>})}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-3">
          <Accordion.Control>Cyclic Dependency</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            A cyclic chain of calls between microservices exists. The existence of cycles of calls between microservices; e.g., A calls B, B calls C, and C calls back A.
            <h4>Result</h4>
            {validation["cyclicDependency"] ? "A cyclic chain of calls between microservices exists. ❌" : "No cyclic dependency exists. ✅"}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-4">
          <Accordion.Control>Hard-Coded Endpoints</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            Hardcoded IP addresses and ports of the services between connected microservices exist.
            <h4>Result</h4>
            {validation["hardCodedEndpointsContext"]["hardcodedEndpoints"].length > 0 ? "Hardcoded IP addresses and ports of the services exist. ❌" : "No hardcoded endpoints exist. ✅"}
            {validation["hardCodedEndpointsContext"]["hardcodedEndpoints"].map((endpoint: any) => { return <p>- {endpoint}</p>})}
            {validation["hardCodedEndpointsContext"]["totalHardcodedEndpoints"] > 0 ? <p>There are {validation["hardCodedEndpointsContext"]["totalHardcodedEndpoints"]} hardcoded endpoints. ❌</p> : null}
            {validation["hardCodedEndpointsContext"]["totalHardcodedIP"] > 0 ? <p>There are {validation["hardCodedEndpointsContext"]["totalHardcodedIP"]} hardcoded IPs. ❌</p> : null}
            {validation["hardCodedEndpointsContext"]["totalHardcodedPorts"] > 0 ? <p>There are {validation["hardCodedEndpointsContext"]["totalHardcodedPorts"]} hardcoded ports. ❌</p> : null}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-5">
          <Accordion.Control>API Gateway</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            An API gateway is used to expose the microservices to the outside world.
            <h4>Result</h4>
            {validation["apiGateway"] ? "An API gateway is used. ✅" : "An API gateway is not used. ❌"}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-6">
          <Accordion.Control>Inapropriate Service Intimacy</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            The microservice keeps on connecting to private data from other services instead of dealing with its own data.
            <h4>Result</h4>
            {validation["inappropriateServiceIntimacyContext"]["count"] > 0 ? <p>There are {validation["inappropriateServiceIntimacyContext"]["count"]} inappropriate service intimacy. ❌</p> : "No inappropriate service intimacy. ✅"}
            {validation["inappropriateServiceIntimacyContext"]["sharedIntimacies"].map((service: any) => { return <p>- {service}</p>})}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-7">
          <Accordion.Control>Microservices Greedy</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            Teams tend to create new microservices for each feature, even when they are not needed. Common examples are microservices created to serve only one or two static HTML pages.
            <h4>Result</h4>
            {validation["microservicesGreedyContext"]["greedyMicroservices"].length > 0 ? "There are " +validation["microservicesGreedyContext"]["greedyMicroservices"] + " greedy microservices. ❌" : "No greedy microservices. ✅" }
            {validation["microservicesGreedyContext"]["greedyMicroservices"].map((service: any) => { return <p>- {service}</p>})}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-8">
          <Accordion.Control>Shared Libraries</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            Shared libraries between different microservices are used.
            <h4>Result</h4>
            {Object.keys(validation["sharedLibraryContext"]["sharedLibraries"]).length > 0 ? "There are " + Object.keys(validation["sharedLibraryContext"]["sharedLibraries"]).length + " shared libraries. ❌": "No shared libraries. ✅"}
            {Object.keys(validation["sharedLibraryContext"]["sharedLibraries"]).length > 0 ? Object.keys(validation["sharedLibraryContext"]["sharedLibraries"]).map((library : any) => <p> - {library} </p>) : ""}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-9">
          <Accordion.Control>Shared Persitency</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            Different microservices access the same relational database. In the worst case, different services access the same entities of the same relational database.
            <h4>Result</h4>
            {validation["sharedPersistencyContext"]["sharedPersistencies"].length > 0 ? "Different microservices access the same relational database. ❌" : "Different microservices do not access the same relational database. ✅"}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-10">
          <Accordion.Control>Too Many Standards</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            Different development languages, protocols, frameworks, etc. are used.
            <h4>Result</h4>
            Presentation types:
            {validation["tooManyStandardsContext"]["presentationTypes"].map((type: any) => { return <p>- {type}</p>})}
            Business types:
            {validation["tooManyStandardsContext"]["businessTypes"].map((type: any) => { return <p>- {type}</p>})}
            Data types:
            {validation["tooManyStandardsContext"]["dataTypes"].map((type: any) => { return <p>- {type}</p>})}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-11">
          <Accordion.Control>Wrong Cuts</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            Microservices are split on the basis of technical layers (presentation, business, and data layers) instead of business capabilities.
            <h4>Result</h4>
            {validation["wrongCutsContext"]["possibleWrongCuts"].length > 0 ? "Possible wrong cuts:" : "No possible wrong cuts. ✅"}
            {validation["wrongCutsContext"]["possibleWrongCuts"].map((cut: any) => { return <p>- {cut.path} (number of entities: {cut.entityCount})</p>})}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-12">
          <Accordion.Control>Mega Service</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            A service that does a lot of things. A monolith.
            <h4>Result</h4>
            {validation["microserviceSizeContext"]["megaServices"].length > 0 ? "There are " + validation["microserviceSizeContext"]["megaServices"].length + " possible mega services. ❌" : "No mega services. ✅"}
            {validation["microserviceSizeContext"]["megaServices"].length > 0 ? validation["microserviceSizeContext"]["megaServices"].map((service: any) => { return <p>- {service}</p>}) : null}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-13">
          <Accordion.Control>Nano Service</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            The granularity of a monolith system divided into microservices is too fine that a single microservice does not fulfill one business capability.
            <h4>Result</h4>
            {validation["microserviceSizeContext"]["nanoServices"].length > 0 ? "There are " + validation["microserviceSizeContext"]["nanoServices"].length + " possible nano services. ❌" : "No nano services. ✅"}
            {validation["microserviceSizeContext"]["nanoServices"].length > 0 ? validation["microserviceSizeContext"]["nanoServices"].map((service: any) => { return <p>- {service}</p>}) : null}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-14">
          <Accordion.Control>Timeout</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            The unsuitable time set for sending messages or waiting for a response.
            <h4>Result</h4>
            {validation["hasTimeout"] ? "There are defined timeouts. ✅" : "There are no defined timeouts. ❌"}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization-15">
          <Accordion.Control>Health check API</Accordion.Control>
          <Accordion.Panel>
            <h4>Description</h4>
            No endpoints for checking the health of microservice.
            <h4>Result</h4>
            Health check endpoints:
            {validation["healthCheckAPIContext"]["healthCheckAPIs"].map((api: any) => { return <p>- "{api.microserviceControllerName}" {api.hasHealthcheckEndpoint ? " - ✅" : "- Missing health check API ❌"}</p>})}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
