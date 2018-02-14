interface IFetchDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export const fetchJsonResponse = (dependencies: IFetchDependencies) =>
  async <ReturnType>(url: string, method: string, object?: any): Promise<ReturnType> => {

    const headers = new Headers();
    headers.append('Content-type', 'Application/json');

    const options = {
      method,
      headers,
      body: object ? JSON.stringify(object) : object,
    };

    const response = await dependencies.fetch(url, options);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
  };
