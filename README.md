<a href="https://club-project-one.vercel.app/" target="_blank">
<img src="./public/images/banner.png" alt="배너" width="100%"/>
</a>

## 프로젝트 개요

**open_your_eyes**은 공연 및 문화예술 정보를 제공하는 웹사이트로, KOPIS 공공데이터 API를 활용하여 최신 공연 정보를 제공하고, 사용자가 편리하게 검색하고 필터링할 수 있도록 설계되었습니다.

## 기술 스택

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** SWR
- **API:** KOPIS 공공데이터 API
- **State Management:** zustand

## 설치 및 실행

### 1. 프로젝트 클론
```sh
git clone <repository-url>
cd open_your_eyes
```

### 2️. 패키지 설치 (Yarn 사용 권장)
```sh
yarn install
```

### 3️. 환경 변수 설정 (`.env.local` 파일 작성)
```env
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
NEXT_PUBLIC_KOPIS_API_KEY=your_kopis_api_key
```

### 4️. 개발 서버 실행
```sh
yarn dev
```

## 주요 스크립트

| 명령어              | 설명 |
|--------------------|-------------------------------------|
| `dev` | `next dev --turbopack` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `next lint` |


## 폴더 구조

```
/open_your_eyes
├── public          # 정적 파일
├── src
│   ├── app        # Next.js App Router 구조
│   ├── components # 재사용 가능한 UI 컴포넌트
│   ├── hooks      # 커스텀 훅
│   ├── lib        # API 호출 및 유틸리티 함수
│   ├── types      # 타입 정의
│   ├── utils      # 유틸리티 함수
│   ├── store      # 전역 상태 관리
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## API 사용 방법

1. `route.ts` 훅을 통해 KOPIS API에서 데이터를 가져옵니다.
2. `prfname`, `prfplcnm` 파라미터를 활용한 검색 기능을 제공합니다.
3. `prfgenre` 코드를 기반으로 공연 장르 필터를 적용할 수 있습니다.

## 기능

-  **공연 검색**: 공연명, 공연시설 검색 가능
-  **필터링**: 공연 장르, 지역, 상태별 필터 적용 가능
-  **무한 스크롤**: SWR을 활용한 데이터 로드
-  **반응형 디자인**: Tailwind CSS 적용


---

*Open Your Eyes*는 문화예술에 대한 접근성을 높이기 위해 만들어진 프로젝트입니다.
