/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { deleteUserController, getFilteredUsersController, getUserController } from './user';
import { ParamsWithFilter } from '../types';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { UserInterface } from '../types';

const serviceMock = jest.fn();

jest.mock('../services/user', () => class UserService {
  async getAutoSuggestUsers(_loginSubstring: string, _limit: number) {
    const data = await serviceMock();
    return data;
  }
  async getUserById(_id: string) {
    const data = await serviceMock();
    return data;
  }
  async deleteUserById(_id: string) {
    const data = await serviceMock();
    return data;
  }
});

const MOCK_DATA_FILTER_USERS: UserInterface[] = [
  {
    id: '349a0298-13e2-45d6-a42e-12a9a4ce9249',
    login: 'Jasmin.Dicki32',
    password: 'xnIJ9cPhGGctPCM',
    age: 6,
    isDeleted: true
  },
  {
    id: '3bae3713-6679-4dde-9002-8010e8499f7e',
    login: 'Jonathon_Nicolas78',
    password: 'hXtVq7TxSuCFxYg',
    age: 100,
    isDeleted: false
  }
];

describe('getFilteredUsersController ', () => {
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  test('should send error to next handler', async () => {
    serviceMock.mockRejectedValueOnce(new Error('invalid.'));
    const mReq = getMockReq<Request<null, any, any, ParamsWithFilter>>({ params: { filter: 'a', limit: 10 } });

    await getFilteredUsersController(mReq, res, next);
    expect(next).toBeCalled();
    expect(next).toBeCalledWith(new Error('invalid.'));
  });
  test('should send response with empty array if no users can be found', async () => {
    serviceMock.mockReturnValueOnce([]);
    const mReq = getMockReq<Request<null, any, any, ParamsWithFilter>>({ params: { filter: 'a', limit: 10 } });

    await getFilteredUsersController(mReq, res, next);

    expect(res.send).toBeCalled();
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining([]));
  });
  test('should send response with data', async () => {
    serviceMock.mockReturnValueOnce(MOCK_DATA_FILTER_USERS);
    const mReq = getMockReq<Request<null, any, any, ParamsWithFilter>>({ params: { filter: 'a', limit: 10 } });

    await getFilteredUsersController(mReq, res, next);

    expect(res.send).toBeCalled();
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining(MOCK_DATA_FILTER_USERS));
  });
});

describe('getUserController ', () => {
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  test('should send error to next handler', async () => {
    serviceMock.mockRejectedValueOnce(new Error('invalid.'));
    const mReq = getMockReq<Request<null, any, any, null>>({ params: { id: '12' } });

    await getUserController(mReq, res, next);
    expect(next).toBeCalled();
    expect(next).toBeCalledWith(new Error('invalid.'));
  });
  test('should send response with data', async () => {
    serviceMock.mockReturnValueOnce(MOCK_DATA_FILTER_USERS[0]);
    const mReq = getMockReq<Request<null, any, any, null>>({ params: { id: '12' } });

    await getUserController(mReq, res, next);

    expect(res.send).toBeCalled();
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining(MOCK_DATA_FILTER_USERS[0]));
  });
});

describe('deleteUserController ', () => {
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  test('should send error to next handler', async () => {
    serviceMock.mockRejectedValueOnce(new Error('invalid.'));
    const mReq = getMockReq<Request<null, any, any, null>>({ params: { id: '12' } });

    await deleteUserController(mReq, res, next);
    expect(next).toBeCalled();
    expect(next).toBeCalledWith(new Error('invalid.'));
  });
  test('should send response with data', async () => {
    serviceMock.mockReturnValueOnce(MOCK_DATA_FILTER_USERS[0]);
    const mReq = getMockReq<Request<null, any, any, null>>({ params: { id: '12' } });

    await deleteUserController(mReq, res, next);

    expect(res.send).toBeCalled();
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining(MOCK_DATA_FILTER_USERS[0]));
  });
});
