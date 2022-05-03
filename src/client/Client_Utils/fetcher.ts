const TOKEN_KEY = `token`;

const fetcher = async (url: string, method: string, data?: unknown) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  if (!data) {
    delete fetchOptions.body;
  }

  if (!token) {
    delete fetchOptions.headers.Authorization;
  }

  try {
    const res = await fetch(url, { method, ...fetchOptions });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Bad Response - ${res.status}`);
    }
  } catch (error) {
    console.log(`Bad Fetcher Call - Error...\n`);
    console.error(error);
    throw new Error(`Bad Fetcher Call Happened!`);
  }
};

// we type FetchData as an object, with many keys of type string, whose values can be string, number, or boolean
interface FetchData {
  [key: string]: string | number | boolean;
}

const GET = (url: string) => fetcher(url, "GET");
const POST = (url: string, data: FetchData) => fetcher(url, "POST", data);
const PUT = (url: string, data: FetchData) => fetcher(url, "PUT", data);
const DELETE = (url: string) => fetcher(url, "DELETE");

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
