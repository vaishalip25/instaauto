<?php
/*
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * The "addresses" collection of methods.
   * Typical usage is:
   *  <code>
   *   $computeService = new Google_ComputeService(...);
   *   $addresses = $computeService->addresses;
   *  </code>
   */
  class Google_AddressesServiceResource extends Google_ServiceResource {

    /**
     * Retrieves the list of addresses grouped by scope. (addresses.aggregatedList)
     *
     * @param string $project Name of the project scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_AddressAggregatedList
     */
    public function aggregatedList($project, $optParams = array()) {
      $params = array('project' => $project);
      $params = array_merge($params, $optParams);
      $data = $this->__call('aggregatedList', array($params));
      if ($this->useObjects()) {
        return new Google_AddressAggregatedList($data);
      } else {
        return $data;
      }
    }
    /**
     * Deletes the specified address resource. (addresses.delete)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param string $address Name of the address resource to delete.
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function delete($project, $region, $address, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region, 'address' => $address);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Returns the specified address resource. (addresses.get)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param string $address Name of the address resource to return.
     * @param array $optParams Optional parameters.
     * @return Google_Address
     */
    public function get($project, $region, $address, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region, 'address' => $address);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Address($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates an address resource in the specified project using the data included
     * in the request. (addresses.insert)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param Google_Address $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function insert($project, $region, Google_Address $postBody, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves the list of address resources contained within the specified
     * region. (addresses.list)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_AddressList
     */
    public function listAddresses($project, $region, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_AddressList($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "disks" collection of methods.
   * Typical usage is:
   *  <code>
   *   $computeService = new Google_ComputeService(...);
   *   $disks = $computeService->disks;
   *  </code>
   */
  class Google_DisksServiceResource extends Google_ServiceResource {

    /**
     * Retrieves the list of disks grouped by scope. (disks.aggregatedList)
     *
     * @param string $project Name of the project scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_DiskAggregatedList
     */
    public function aggregatedList($project, $optParams = array()) {
      $params = array('project' => $project);
      $params = array_merge($params, $optParams);
      $data = $this->__call('aggregatedList', array($params));
      if ($this->useObjects()) {
        return new Google_DiskAggregatedList($data);
      } else {
        return $data;
      }
    }
    /**
     * (disks.createSnapshot)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $zone Name of the zone scoping this request.
     * @param string $disk Name of the persistent disk resource to delete.
     * @param Google_Snapshot $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function createSnapshot($project, $zone, $disk, Google_Snapshot $postBody, $optParams = array()) {
      $params = array('project' => $project, 'zone' => $zone, 'disk' => $disk, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('createSnapshot', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Deletes the specified persistent disk resource. (disks.delete)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $zone Name of the zone scoping this request.
     * @param string $disk Name of the persistent disk resource to delete.
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function delete($project, $zone, $disk, $optParams = array()) {
      $params = array('project' => $project, 'zone' => $zone, 'disk' => $disk);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Returns the specified persistent disk resource. (disks.get)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $zone Name of the zone scoping this request.
     * @param string $disk Name of the persistent disk resource to return.
     * @param array $optParams Optional parameters.
     * @return Google_Disk
     */
    public function get($project, $zone, $disk, $optParams = array()) {
      $params = array('project' => $project, 'zone' => $zone, 'disk' => $disk);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Disk($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates a persistent disk resource in the specified project using the data
     * included in the request. (disks.insert)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $zone Name of the zone scoping this request.
     * @param Google_Disk $postBody
     * @param array $optParams Optional parameters.
     *
     * @opt_param string sourceImage Optional. Source image to restore onto a disk.
     * @return Google_Operation
     */
    public function insert($project, $zone, Google_Disk $postBody, $optParams = array()) {
      $params = array('project' => $project, 'zone' => $zone, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves the list of persistent disk resources contained within the
     * specified zone. (disks.list)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $zone Name of the zone scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_DiskList
     */
    public function listDisks($project, $zone, $optParams = array()) {
      $params = array('project' => $project, 'zone' => $zone);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_DiskList($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "firewalls" collection of methods.
   * Typical usage is:
   *  <code>
   *   $computeService = new Google_ComputeService(...);
   *   $firewalls = $computeService->firewalls;
   *  </code>
   */
  class Google_FirewallsServiceResource extends Google_ServiceResource {

    /**
     * Deletes the specified firewall resource. (firewalls.delete)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $firewall Name of the firewall resource to delete.
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function delete($project, $firewall, $optParams = array()) {
      $params = array('project' => $project, 'firewall' => $firewall);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Returns the specified firewall resource. (firewalls.get)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $firewall Name of the firewall resource to return.
     * @param array $optParams Optional parameters.
     * @return Google_Firewall
     */
    public function get($project, $firewall, $optParams = array()) {
      $params = array('project' => $project, 'firewall' => $firewall);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Firewall($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates a firewall resource in the specified project using the data included
     * in the request. (firewalls.insert)
     *
     * @param string $project Name of the project scoping this request.
     * @param Google_Firewall $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function insert($project, Google_Firewall $postBody, $optParams = array()) {
      $params = array('project' => $project, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves the list of firewall resources available to the specified project.
     * (firewalls.list)
     *
     * @param string $project Name of the project scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_FirewallList
     */
    public function listFirewalls($project, $optParams = array()) {
      $params = array('project' => $project);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_FirewallList($data);
      } else {
        return $data;
      }
    }
    /**
     * Updates the specified firewall resource with the data included in the
     * request. This method supports patch semantics. (firewalls.patch)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $firewall Name of the firewall resource to update.
     * @param Google_Firewall $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function patch($project, $firewall, Google_Firewall $postBody, $optParams = array()) {
      $params = array('project' => $project, 'firewall' => $firewall, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('patch', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Updates the specified firewall resource with the data included in the
     * request. (firewalls.update)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $firewall Name of the firewall resource to update.
     * @param Google_Firewall $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function update($project, $firewall, Google_Firewall $postBody, $optParams = array()) {
      $params = array('project' => $project, 'firewall' => $firewall, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('update', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "forwardingRules" collection of methods.
   * Typical usage is:
   *  <code>
   *   $computeService = new Google_ComputeService(...);
   *   $forwardingRules = $computeService->forwardingRules;
   *  </code>
   */
  class Google_ForwardingRulesServiceResource extends Google_ServiceResource {

    /**
     * Retrieves the list of forwarding rules grouped by scope.
     * (forwardingRules.aggregatedList)
     *
     * @param string $project Name of the project scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_ForwardingRuleAggregatedList
     */
    public function aggregatedList($project, $optParams = array()) {
      $params = array('project' => $project);
      $params = array_merge($params, $optParams);
      $data = $this->__call('aggregatedList', array($params));
      if ($this->useObjects()) {
        return new Google_ForwardingRuleAggregatedList($data);
      } else {
        return $data;
      }
    }
    /**
     * Deletes the specified ForwardingRule resource. (forwardingRules.delete)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param string $forwardingRule Name of the ForwardingRule resource to delete.
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function delete($project, $region, $forwardingRule, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region, 'forwardingRule' => $forwardingRule);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Returns the specified ForwardingRule resource. (forwardingRules.get)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param string $forwardingRule Name of the ForwardingRule resource to return.
     * @param array $optParams Optional parameters.
     * @return Google_ForwardingRule
     */
    public function get($project, $region, $forwardingRule, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region, 'forwardingRule' => $forwardingRule);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_ForwardingRule($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates a ForwardingRule resource in the specified project and region using
     * the data included in the request. (forwardingRules.insert)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param Google_ForwardingRule $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function insert($project, $region, Google_ForwardingRule $postBody, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves the list of ForwardingRule resources available to the specified
     * project and region. (forwardingRules.list)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_ForwardingRuleList
     */
    public function listForwardingRules($project, $region, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_ForwardingRuleList($data);
      } else {
        return $data;
      }
    }
    /**
     * Changes target url for forwarding rule. (forwardingRules.setTarget)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $region Name of the region scoping this request.
     * @param string $forwardingRule Name of the ForwardingRule resource in which target is to be set.
     * @param Google_TargetReference $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function setTarget($project, $region, $forwardingRule, Google_TargetReference $postBody, $optParams = array()) {
      $params = array('project' => $project, 'region' => $region, 'forwardingRule' => $forwardingRule, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('setTarget', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "globalOperations" collection of methods.
   * Typical usage is:
   *  <code>
   *   $computeService = new Google_ComputeService(...);
   *   $globalOperations = $computeService->globalOperations;
   *  </code>
   */
  class Google_GlobalOperationsServiceResource extends Google_ServiceResource {

    /**
     * Retrieves the list of all operations grouped by scope.
     * (globalOperations.aggregatedList)
     *
     * @param string $project Name of the project scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_OperationAggregatedList
     */
    public function aggregatedList($project, $optParams = array()) {
      $params = array('project' => $project);
      $params = array_merge($params, $optParams);
      $data = $this->__call('aggregatedList', array($params));
      if ($this->useObjects()) {
        return new Google_OperationAggregatedList($data);
      } else {
        return $data;
      }
    }
    /**
     * Deletes the specified operation resource. (globalOperations.delete)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $operation Name of the operation resource to delete.
     * @param array $optParams Optional parameters.
     */
    public function delete($project, $operation, $optParams = array()) {
      $params = array('project' => $project, 'operation' => $operation);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      return $data;
    }
    /**
     * Retrieves the specified operation resource. (globalOperations.get)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $operation Name of the operation resource to return.
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function get($project, $operation, $optParams = array()) {
      $params = array('project' => $project, 'operation' => $operation);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves the list of operation resources contained within the specified
     * project. (globalOperations.list)
     *
     * @param string $project Name of the project scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_OperationList
     */
    public function listGlobalOperations($project, $optParams = array()) {
      $params = array('project' => $project);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_OperationList($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "httpHealthChecks" collection of methods.
   * Typical usage is:
   *  <code>
   *   $computeService = new Google_ComputeService(...);
   *   $httpHealthChecks = $computeService->httpHealthChecks;
   *  </code>
   */
  class Google_HttpHealthChecksServiceResource extends Google_ServiceResource {

    /**
     * Deletes the specified HttpHealthCheck resource. (httpHealthChecks.delete)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $httpHealthCheck Name of the HttpHealthCheck resource to delete.
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function delete($project, $httpHealthCheck, $optParams = array()) {
      $params = array('project' => $project, 'httpHealthCheck' => $httpHealthCheck);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Returns the specified HttpHealthCheck resource. (httpHealthChecks.get)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $httpHealthCheck Name of the HttpHealthCheck resource to return.
     * @param array $optParams Optional parameters.
     * @return Google_HttpHealthCheck
     */
    public function get($project, $httpHealthCheck, $optParams = array()) {
      $params = array('project' => $project, 'httpHealthCheck' => $httpHealthCheck);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_HttpHealthCheck($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates a HttpHealthCheck resource in the specified project using the data
     * included in the request. (httpHealthChecks.insert)
     *
     * @param string $project Name of the project scoping this request.
     * @param Google_HttpHealthCheck $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function insert($project, Google_HttpHealthCheck $postBody, $optParams = array()) {
      $params = array('project' => $project, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves the list of HttpHealthCheck resources available to the specified
     * project. (httpHealthChecks.list)
     *
     * @param string $project Name of the project scoping this request.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filter Optional. Filter expression for filtering listed resources.
     * @opt_param string maxResults Optional. Maximum count of results to be returned. Maximum value is 500 and default value is 100.
     * @opt_param string pageToken Optional. Tag returned by a previous list request truncated by maxResults. Used to continue a previous list request.
     * @return Google_HttpHealthCheckList
     */
    public function listHttpHealthChecks($project, $optParams = array()) {
      $params = array('project' => $project);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_HttpHealthCheckList($data);
      } else {
        return $data;
      }
    }
    /**
     * Updates a HttpHealthCheck resource in the specified project using the data
     * included in the request. This method supports patch semantics.
     * (httpHealthChecks.patch)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $httpHealthCheck Name of the HttpHealthCheck resource to update.
     * @param Google_HttpHealthCheck $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function patch($project, $httpHealthCheck, Google_HttpHealthCheck $postBody, $optParams = array()) {
      $params = array('project' => $project, 'httpHealthCheck' => $httpHealthCheck, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('patch', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Updates a HttpHealthCheck resource in the specified project using the data
     * included in the request. (httpHealthChecks.update)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $httpHealthCheck Name of the HttpHealthCheck resource to update.
     * @param Google_HttpHealthCheck $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function update($project, $httpHealthCheck, Google_HttpHealthCheck $postBody, $optParams = array()) {
      $params = array('project' => $project, 'httpHealthCheck' => $httpHealthCheck, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('update', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "images" collection of methods.
   * Typical usage is:
   *  <code>
   *   $computeService = new Google_ComputeService(...);
   *   $images = $computeService->images;
   *  </code>
   */
  class Google_ImagesServiceResource extends Google_ServiceResource {

    /**
     * Deletes the specified image resource. (images.delete)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $image Name of the image resource to delete.
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function delete($project, $image, $optParams = array()) {
      $params = array('project' => $project, 'image' => $image);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Sets the deprecation status of an image. If no message body is given, clears
     * the deprecation status instead. (images.deprecate)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $image Image name.
     * @param Google_DeprecationStatus $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Operation
     */
    public function deprecate($project, $image, Google_DeprecationStatus $postBody, $optParams = array()) {
      $params = array('project' => $project, 'image' => $image, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('deprecate', array($params));
      if ($this->useObjects()) {
        return new Google_Operation($data);
      } else {
        return $data;
      }
    }
    /**
     * Returns the specified image resource. (images.get)
     *
     * @param string $project Name of the project scoping this request.
     * @param string $image Name of the image resource to return.
     * @param array $optParams Optional parameters.
     * @return Google_Image
     */
    public function get($project, $image, $optParams = array()) {
      $params = array('project' => $project, 'image' => $image);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Image($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates an image resource in the specified project using the data included in
     * the request. (images.insert)
     *
     * @param string $project Name of the project scoping this request.
     * @param Google_Image $