const config = {
  apiBase: import.meta.env.PUBLIC_API_BASE,
  websiteToken: import.meta.env.PUBLIC_TOKEN,
};

export default class DefaultService {
  get apiBase() {
    return config.apiBase;
  }

  get headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.websiteToken}`,
    };
  }

  get headersPublic() {
    return {
      "Content-Type": "application/json",
    };
  }
}
