import axiosClient from "./axiosClient";

export interface IUser {
  title?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  thumbnail?: string;
}

export interface IParams {
  results?: number;
  page?: number;
}

export const products = async (params: IParams) => {
  const getDataUser = await axiosClient.get("", { params });
  const data = getDataUser.data.results.map((ele: any) => {
    return {
      title: ele.name.title,
      firstName: ele.name.first,
      lastName: ele.name.last,
      userName: ele.login.username,
      thumbnail: ele.picture.thumbnail,
    };
  });
  return data;
};
