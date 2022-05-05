import { PaymentMethod } from "@stripe/stripe-js";

export const TOKEN_KEY = `token`;

//
/**
 * use a .catch after every Fetcher call
 * res.json() is already done
 * body will already be stringified
 */
const Fetcher = async (url: string, method: string, data?: unknown) => {
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
    const data = await res.json();
    console.log({ data });
    if (res.ok) {
      // console.log(`res was ok here`);
      return data;
    } else {
      console.log(`res was bad here`);
      // throw new Error(`Bad Response - ${res.status}`);
      return data;
    }
  } catch (error) {
    // console.log(`res was super bad here`);

    console.log(`Bad Fetcher Call - Error...\n`);
    console.error(error);
    // throw new Error(`Bad Fetcher Call Happened`);
    // This throw will not be caught in this catch block, thus, ALL Fetcher calls need to be in a try catch block
  }
};

// we type FetchData as an object, with many keys of type string, whose values can be string, number, or boolean
// PaymentMethod type added to enable Fetcher to work on Donate Component
interface FetchData {
  [key: string]: string | number | boolean | PaymentMethod;
}

const GET = (url: string) => Fetcher(url, "GET");
const POST = (url: string, data: FetchData) => Fetcher(url, "POST", data);
const PUT = (url: string, data: FetchData) => Fetcher(url, "PUT", data);
const DELETE = (url: string) => Fetcher(url, "DELETE");

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
