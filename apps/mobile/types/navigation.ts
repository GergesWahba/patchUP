export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Categories: undefined;
};

export type CustomerTabParamList = {
  Dashboard: undefined;
  CreateRequest: undefined;
  ActiveRequests: undefined;
  RequestHistory: undefined;
  Profile: undefined;
};

export type ProviderTabParamList = {
  ProviderDashboard: undefined;
  AvailableJobs: undefined;
  AcceptedJobs: undefined;
  CompletedJobs: undefined;
  ProviderProfile: undefined;
};

export type SharedStackParamList = {
  RequestDetails: {
    requestId: string;
  };
  Categories: undefined;
};

export type CustomerRootStackParamList = {
  CustomerTabs: undefined;
} & SharedStackParamList;

export type ProviderRootStackParamList = {
  ProviderTabs: undefined;
} & SharedStackParamList;
