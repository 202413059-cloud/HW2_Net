

---

md
# Netflix-like Front-End Demo Site (WSD Assignment 02)

Vue 3 + Vite 기반으로 제작한 **Netflix 유사 Front-End Demo SPA**입니다.  
The Movie Database(TMDB) API를 활용하여 영화 포스터 중심의 UI를 구성하였으며,  
GitHub Pages + GitHub Actions를 통해 정적 웹사이트 자동 배포를 구현했습니다.

---

## 1. 프로젝트 개요

본 프로젝트는 Web Software Development 과제의 일환으로,
- 최신 Front-End 프레임워크(Vue.js)를 활용한 SPA 개발
- TMDB API 연동을 통한 비동기 데이터 처리
- LocalStorage 기반 사용자 상태 및 데이터 관리
- Gitflow 전략 및 GitHub Pages 배포 자동화
- GPT(ChatGPT) 등의 AI를 적극 활용한 개발

을 목표로 제작되었습니다.

Netflix Demo Page를 참고하되, Vue 3 Composition API 기반으로 직접 설계 및 구현하였습니다.

---

## 2. 기술 스택

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **API**: The Movie Database (TMDB)
- **Deployment**: GitHub Pages (GitHub Actions)
- **State / Storage**: LocalStorage
- **AI Tool**: ChatGPT (설계, 디버깅, 리팩토링 지원), Gemini (설계, 질답)

---

## 3. 주요 기능

###  로그인 / 회원가입
- 이메일 형식 검증
- 회원가입 / 로그인 전환 애니메이션
- 사용자 정보 LocalStorage 저장
- 로그인 여부에 따른 라우팅 가드 처리
- 로그인 성공 시 TMDB API Key(LocalStorage) 설정

###  Home (/)
- TMDB API를 활용한 **4개 이상의 영화 리스트**
  - Popular
  - Now Playing
  - Top Rated
  - Upcoming
- 영화 포스터 Hover 확대 효과
- Skeleton UI를 통한 로딩 처리
- 영화 클릭 시 추천(Wishlist) 토글

###  Popular (/popular)
- **Table View ↔ Infinite Scroll View 토글**
- Table View
  - Pagination
  - 한 페이지 내 겹침 없는 렌더링
- Infinite Scroll View
  - 스크롤 바닥 도달 시 다음 페이지 로딩
  - Loading Skeleton
  - Top 버튼 제공

###  Search (/search)
- TMDB `discover/movie` API 기반 필터링
- 필터 항목
  - 장르
  - 최소 평점
  - 개봉년도
  - 정렬 기준
- 필터 초기화 기능
- Pagination 지원

###  Wishlist (/wishlist)
- **API 호출 없이 LocalStorage 데이터만 사용**
- 추천 영화 목록 렌더링
- 즉시 반영되는 추천 토글

---

## 4. LocalStorage 사용 내역

본 프로젝트에서는 최소 3개 이상의 LocalStorage Key를 사용합니다.

- `users` : 회원가입 사용자 정보
- `auth` : 로그인 상태 및 사용자 ID
- `TMDb-Key` : TMDB API Key
- `wishlist` : 추천 영화 목록

---

## 5. 폴더 구조

```

src/
├─ api/        # TMDB API, axios client, URL builder
├─ components/ # MovieCard, Skeleton, Header 등 공통 컴포넌트
├─ pages/      # Home, Popular, Search, Wishlist, SignIn
├─ router/     # Vue Router 설정 및 Guard
├─ utils/      # auth, wishlist 등 공통 로직
└─ style/      # 글로벌 스타일

````

---

## 6. Gitflow 전략

본 프로젝트는 Gitflow 전략을 기반으로 관리되었습니다.

- `main` : 배포 브랜치
- `develop` : 개발 통합 브랜치
- `feature/*` : 기능 단위 개발 브랜치
  - feature/signin
  - feature/tmdb-home
Pull Request 기반으로 main 브랜치에 병합 후 자동 배포됩니다.

---

## 7. 실행 방법

```bash
npm install
npm run dev
npm run build
````

>  `node_modules`는 제출 시 제외되며,
> `package.json`을 통해 의존성 설치가 가능합니다.

---

## 8. 배포 주소

* **GitHub Repository**
  [https://github.com/202413059-cloud/HW2_Net](https://github.com/202413059-cloud/HW2_Net)

* **GitHub Pages**
  [https://202413059-cloud.github.io/HW2_Net/](https://202413059-cloud.github.io/HW2_Net/)

---

## 9. AI 활용 내역

개발 전반에서 ChatGPT, Gemini를 적극 활용하였습니다.

* Vue 3 Composition API 구조 설계
* TMDB API 인증 방식(v3 / v4) 문제 해결
* Infinite Scroll / IntersectionObserver 구현
* GitHub Pages 새로고침(404) 문제 해결
* Skeleton UI 로딩 처리 설계
* Gitflow 및 배포 자동화 구성
* README 및 제출 문서 작성 보조

AI 활용 내용은 `AI.pdf` 파일에 질문-답변 형태로 정리하여 제출합니다.

---

## 10. 참고 자료

* TMDB 공식 문서
  [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)

* Demo Page
  [http://clinic.jbnu.ac.kr:3000/24-02-WSD-Assignment-02-Demo/#/](http://clinic.jbnu.ac.kr:3000/24-02-WSD-Assignment-02-Demo/#/)

---


