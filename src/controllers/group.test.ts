/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { GroupInterface } from '../types';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { getAllGroupsController, getGroupController } from './group';

const serviceMock = jest.fn();

jest.mock('../services/group', () => class GroupService {
  async getAllGroups() {
    const data = await serviceMock();
    return data;
  }
  async getGroupById(_id: string) {
    const data = await serviceMock();
    return data;
  }
});

const MOCK_DATA_GROUPS: GroupInterface[] = [
  {
    'id': 'dd0c5ba0-ba40-11eb-9144-dbea1681ada0',
    'name': 'usr',
    'permission': [
      'WRITE'
    ]
  }
];

describe('getAllGroupsController ', () => {
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  test('should send error to next handler', async () => {
    serviceMock.mockRejectedValueOnce(new Error('invalid.'));
    const mReq = getMockReq<Request<null, any, any, null>>();

    await getAllGroupsController(mReq, res, next);
    expect(next).toBeCalled();
    expect(next).toBeCalledWith(new Error('invalid.'));
  });
  test('should send response with empty array if no groups can be found', async () => {
    serviceMock.mockReturnValueOnce([]);
    const mReq = getMockReq<Request<null, any, any, null>>();

    await getAllGroupsController(mReq, res, next);

    expect(res.send).toBeCalled();
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining([]));
  });
  test('should send response with data', async () => {
    serviceMock.mockReturnValueOnce(MOCK_DATA_GROUPS);
    const mReq = getMockReq<Request<null, any, any, null>>();

    await getAllGroupsController(mReq, res, next);

    expect(res.send).toBeCalled();
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining(MOCK_DATA_GROUPS));
  });
});

describe('getGroupController ', () => {
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  test('should send error to next handler', async () => {
    serviceMock.mockRejectedValueOnce(new Error('invalid.'));
    const mReq = getMockReq<Request<null, any, any, null>>({ params: { id: '12' } });

    await getGroupController(mReq, res, next);
    expect(next).toBeCalled();
    expect(next).toBeCalledWith(new Error('invalid.'));
  });
  test('should send response with data', async () => {
    serviceMock.mockReturnValueOnce(MOCK_DATA_GROUPS[0]);
    const mReq = getMockReq<Request<null, any, any, null>>({ params: { id: '12' } });

    await getGroupController(mReq, res, next);

    expect(res.send).toBeCalled();
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining(MOCK_DATA_GROUPS[0]));
  });
});
