// 두근두근 DEX팅 스크립트 - QR 코드 URL 업데이트
document.addEventListener('DOMContentLoaded', function() {
  // 페이지 요소
  const mainPage = document.getElementById('main-page');
  const profilePage = document.getElementById('profile-page');
  const idealPage = document.getElementById('ideal-page');
  const resultPage = document.getElementById('result-page');
  
  // 버튼 요소
  const profileBtn = document.getElementById('profile-btn');
  const idealBtn = document.getElementById('ideal-btn');
  const backBtns = document.querySelectorAll('.back-btn');
  const homeBtn = document.getElementById('home-btn');
  
  // 폼 요소
  const profileForm = document.getElementById('profile-form');
  const idealForm = document.getElementById('ideal-form');
  
  // 결과 컨테이너
  const resultContent = document.getElementById('result-content');
  
  // QR 코드 생성
  generateQRCode();
  
  // 페이지 전환 - 프로필 등록 버튼
  profileBtn.addEventListener('click', function() {
    showPage(profilePage);
  });
  
  // 페이지 전환 - 이상형 등록 버튼
  idealBtn.addEventListener('click', function() {
    showPage(idealPage);
  });
  
  // 페이지 전환 - 뒤로가기 버튼
  backBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      showPage(mainPage);
    });
  });
  
  // 페이지 전환 - 홈 버튼
  homeBtn.addEventListener('click', function() {
    showPage(mainPage);
  });
  
  // 프로필 등록 폼 제출
  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(profileForm);
    let profileData = {
      type: '프로필',
      gender: formData.get('gender'),
      instagram: formData.get('instagram'),
      mbti: formData.get('mbti-ei') + ' ' + formData.get('mbti-type'),
      field: formData.get('field'),
      appearance: formData.get('appearance'),
      values: formData.get('values'),
      hobby: formData.get('hobby')
    };
    
    // 결과 표시
    displayResult(profileData);
    
    // 폼 초기화
    profileForm.reset();
  });
  
  // 이상형 등록 폼 제출
  idealForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(idealForm);
    let idealData = {
      type: '이상형',
      gender: formData.get('ideal-gender'),
      mbti: formData.get('ideal-mbti-ei') + ' ' + formData.get('ideal-mbti-type'),
      field: formData.get('ideal-field'),
      appearance: formData.get('ideal-appearance'),
      values: formData.get('ideal-values'),
      hobby: formData.get('ideal-hobby')
    };
    
    // 결과 표시
    displayResult(idealData);
    
    // 폼 초기화
    idealForm.reset();
  });
  
  // QR 코드 생성 함수
  function generateQRCode() {
    // 실제 배포된 GitHub Pages URL로 변경
    const url = "https://leejemin4583.github.io/DEXting/";
    
    // QR 코드 생성 (qrcode-generator 라이브러리 사용)
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    
    // QR 코드 HTML 삽입
    document.getElementById('qrcode').innerHTML = qr.createImgTag(5);
  }
  
  // 페이지 전환 함수
  function showPage(page) {
    // 모든 페이지 숨기기
    mainPage.style.display = 'none';
    profilePage.style.display = 'none';
    idealPage.style.display = 'none';
    resultPage.style.display = 'none';
    
    // 선택한 페이지만 표시
    page.style.display = 'flex';
    
    // 페이지 상단으로 스크롤
    window.scrollTo(0, 0);
  }
  
  // 결과 표시 함수
  function displayResult(data) {
    let resultHTML = '<h3>' + data.type + ' 등록 정보</h3>';
    resultHTML += '<ul>';
    
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'type') {
        let fieldName = '';
        switch(key) {
          case 'gender': fieldName = '성별'; break;
          case 'instagram': fieldName = '인스타그램 아이디'; break;
          case 'mbti': fieldName = 'MBTI'; break;
          case 'field': fieldName = '계열'; break;
          case 'appearance': fieldName = '외모 유형'; break;
          case 'values': fieldName = '가치관 (깻잎논쟁)'; break;
          case 'hobby': fieldName = '취미'; break;
          default: fieldName = key;
        }
        
        if (value) {
          resultHTML += '<li><strong>' + fieldName + ':</strong> ' + value + '</li>';
        }
      }
    }
    
    resultHTML += '</ul>';
    resultHTML += '<p>등록해주셔서 감사합니다!</p>';
    
    // 결과 내용 업데이트
    resultContent.innerHTML = resultHTML;
    
    // 결과 페이지 표시
    showPage(resultPage);
  }
});
