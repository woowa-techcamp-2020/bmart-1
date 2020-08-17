export enum ERROR_MSG {
  NO_TOKEN = '토큰 정보가 존재하지 않습니다.',
  EXPIRED_TOKEN = '만료된 토큰 정보 입니다.',
  BAD_REQUEST = '잘못된 요청 데이터 입니다.',
  INTERNAL_ERROR = '저희의 잘못입니다.',

  NO_PRODUCT = '존재하지 않는 상품입니다.',
  NO_ADDRESS = '존재하지 않는 주소입니다.',
  EMPTY_ADDRESS = '빈 주소를 입력할 수 없습니다.',
  NOT_YOUR_ADDRESS = '수정하거나 삭제할 수 없는 주소입니다.',
  INVALID_TOPIC = '토픽이 유효하지 않거나 존재하지 않습니다.',
}

export enum STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  NO_TOKEN = 401,
  NOT_FOUND = 404,
  NO_PERMISSION = 403,
  INTERNAL_ERROR = 500,
}

export enum CONSTRAINT {
  MAX_ADDRESS_LENGTH = 300,
  MIN_QUANTITY = 1,
}

export enum PAGINATION {
  PRODUCTS_NUM_IN_PAGE = 30,
  PRODUCTS_NUM_IN_NEW = 12,
  PRODUCTS_NUM_IN_NOW = 12,
}

export const CATEGORIES = [
  '1인 가구',
  '3천원의 행복',
  'Vegan',
  '가전제품',
  '간편한 아침식사',
  '건강식품',
  '과일·견과·쌀',
  '국·반찬·메인요리',
  '뚝딱! 간편식',
  '면·양념·오일',
  '반려동물',
  '베이비·키즈',
  '베이커리·치즈·델리',
  '뷰티·바디케어',
  '샐러드·간편식',
  '생활용품·리빙',
  '수산·해산·건어물',
  '시원한 여름',
  '식단관리',
  '오프라인 맛집',
  '음료·우유·떡·간식',
  '정육·계란',
  '주방용품',
  '지속가능한 상품',
  '채소',
] as const
