### 모듈 시스템
모듈을 생성하고, 불러오고, 사용하는 등의 모듈을 다루는 다양한 기능을 제공하는 시스템  

### 라이브러리란? 
프로그램을 개발할 때 필요한 다양한 기능들을 미리 만들어 모듈화 해놓은 것

#### package.json
- 대략적인 정보 저장
#### package-lock.json 
- 실제 버전의 정보가 명시

```Terminal
npm i
```
위 명령어를 입력하면 package.json의 dependencies의 정보를 기준으로 모든 패키지, 모든 라이브러리를 다시 설치해준다
누군가에게 공유하거나 깃허브에 업로드 할 때 node_modules 파일은 함께 공유하지 않음