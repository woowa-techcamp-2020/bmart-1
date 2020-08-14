export const enum ERROR_MSG {
  NO_TOKEN = '토큰 정보가 존재하지 않습니다.',
  EXPIRED_TOKEN = '만료된 토큰 정보 입니다.',
  BAD_REQUEST = '잘못된 요청 데이터 입니다.',
  INTERNAL_ERROR = '저희의 잘못입니다.',
}

export const enum STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  NO_TOKEN = 401,
  NOT_FOUND = 404,
  NO_PERMISSION = 403,
  INTERNAL_ERROR = 500,
}

export const enum CONSTRAINT {
  MAX_ADDRESS_LENGTH = 300,
}

export const enum PAGINATION {
  PRODUCTS_NUM_IN_PAGE = 30,
  PRODUCTS_NUM_IN_NEW = 10,
  PRODUCTS_NUM_IN_NOW = 20,
}
