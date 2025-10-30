// 지출결의서 서식 파일 목록
const expenseFiles = [
    "지출결의서.hwp",
    "지출결의서_양식.xls",
    "지출결의서계정분류.pdf"
];
// 매출전표 서식 파일 목록
const salesSlipFiles = [
    "신용카드매출전표등 수령명세서(갑¸ 을).pdf"
];
// 위임장 서식 파일 목록
const delegationFiles = [
    "일반위임장(샘플).pdf",
    "일반위임장.hwp",
    "일반위임장.pdf",
    "주민등록등.초본 위임장.pdf"
];
// 영수증 서식 파일 목록
const receiptFiles = [
    "★영수증의서식고시개정_국세청고시제2019-19호.hwp",
    "간이영수증.hwp",
    "간이영수증.xls",
    "영수증 붙임양식.hwp"
];
const formsData = [
    // 기존 카드 데이터 ...existing code...
];

// 업로드/등록된 파일들을 formsData에 동적으로 추가
function getAllFormFiles() {
    const categories = [
        { name: '학생 서식', folder: 'student', files: studentFiles },
        { name: '표준근로계약서(고용노동부)', folder: '표준근로계약서(고용노동부)', files: contractFiles },
        { name: '영수증', folder: '영수증', files: receiptFiles },
        { name: '위임장', folder: '위임장', files: delegationFiles },
        { name: '매출전표', folder: '매출전표', files: salesSlipFiles },
        { name: '지출결의서', folder: '지출결의서', files: expenseFiles }
    ];
    let arr = [];
    categories.forEach(cat => {
        cat.files.forEach(file => {
            arr.push({
                id: `${cat.folder}-${file}`,
                title: file.replace(/\.[^/.]+$/, ''),
                category: cat.name,
                downloads: 0,
                fileLink: `/free-forms/${encodeURIComponent(cat.folder)}/${encodeURIComponent(file)}`,
                keywords: [file.replace(/\.[^/.]+$/, ''), cat.name, file]
            });
        });
    });
    return arr;
}

// 동적 렌더링 함수
function renderForms(forms) {
    const container = document.getElementById('forms-list-container');
    container.innerHTML = '';
    if (!forms.length) {
        container.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }
    forms.forEach((form, idx) => {
        const article = document.createElement('article');
        article.className = 'form-card';
        article.innerHTML = `
            <h3>${form.title}</h3>
            <p>카테고리: ${form.category}</p>
            <p>다운로드: ${form.downloads}회</p>
            <button class="download-btn" data-id="${form.id}" data-title="${form.title}" data-link="${form.fileLink}">서식 즉시 다운로드</button>
        `;
        container.appendChild(article);
        // 매 5번째 서식 카드 뒤에 광고 단위 삽입
        if ((idx + 1) % 5 === 0) {
            const adDiv = document.createElement('div');
            adDiv.id = `adsense-feed-unit-${(idx + 1) / 5}`;
            adDiv.className = 'adsense-feed-unit';
            adDiv.innerHTML = '<!-- 여기에 구글/카카오 광고 단위 코드 삽입 --><span>ADVERTISEMENT</span>';
            container.appendChild(adDiv);
        }
    });
    // 다운로드 버튼 이벤트 연결
    container.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const formId = this.getAttribute('data-id');
            const formTitle = this.getAttribute('data-title');
            saveRecentForm(formId, formTitle);
            window.open(this.getAttribute('data-link'), '_blank');
        });
    });
}


// 학생 서식 파일 목록
const studentFiles = [
    "8칸그림일기장.hwp",
    "겨울방학 독서록.hwp",
    "공책 이름표.hwp",
    "구구단 문제 풀이 노트.hwp",
    "구구단.hwp",
    "구구단.jpg",
    "구몬 구구단송 외우기.hwp",
    "구몬 시간 체크.hwp",
    "그림일기장.hwp",
    "나는독서왕!!!+독서기록장.hwp",
    "받아쓰기+공책.pptx",
    "받아쓰기공책-20번까지.pptx",
    "봄방학 체크표.hwp",
    "알파벳 대문자 소문자.hwp",
    "영어 발음기호.hwp",
    "영어공책.hwp",
    "영어발음 어떻게.hwp",
    "초등학생+영어공책+양식.hwp",
    "한글 기본음절표.hwp",
    "한자,영어노트.hwp",
    "히라가나가타가나 외우기.hwp"
];

// 표준근로계약서(고용노동부) 서식 파일 목록
const contractFiles = [
    "표준근로계약서(건설일용근로자).hwp",
    "표준근로계약서(계약직).hwp",
    "표준근로계약서(단시간근로자).hwp",
    "표준근로계약서(만18세미만연소근로자).hwp",
    "표준근로계약서(외국인 농업축산업어업분야).hwp",
    "표준근로계약서(외국인).hwp",
    "표준근로계약서(정규직).hwp"
];


function renderStudentFiles() {
    // 업로드 영역과 서식 목록 영역을 분리하여 렌더링
    const masonryContainerId = 'student-masonry-container';
    let masonryContainer = document.getElementById(masonryContainerId);
    if (!masonryContainer) {
        masonryContainer = document.createElement('div');
        masonryContainer.id = masonryContainerId;
        document.getElementById('upload-section').insertAdjacentElement('afterend', masonryContainer);
    }
    // 중복 제거를 위해 Set 사용
    const seen = new Set();
    const categories = [
        { name: '학생 서식', folder: 'student', files: studentFiles },
        { name: '표준근로계약서(고용노동부)', folder: '표준근로계약서(고용노동부)', files: contractFiles },
        { name: '영수증', folder: '영수증', files: receiptFiles },
        { name: '위임장', folder: '위임장', files: delegationFiles },
        { name: '매출전표', folder: '매출전표', files: salesSlipFiles },
        { name: '지출결의서', folder: '지출결의서', files: expenseFiles }
    ];
    let cardsHtml = '';
    categories.forEach(cat => {
        cat.files.forEach(file => {
            const key = cat.name + '-' + file;
            if (seen.has(key)) return;
            seen.add(key);
            const ext = file.split('.').pop().toLowerCase();
            cardsHtml += `
                <article class="form-card">
                    <h3>${file.replace(/\.[^/.]+$/, '')}</h3>
                    <p>카테고리: ${cat.name}</p>
                    <p>다운로드: 0회</p>
                    <button class="download-btn" onclick="downloadStudentFile('${cat.folder}','${file}')">서식 즉시 다운로드</button>
                    ${cat.folder === 'student' && ext === 'jpg' ? `<button onclick=\"previewStudentFile('${cat.folder}','${file}')\">미리보기</button>` : ''}
                </article>
            `;
        });
    });
    masonryContainer.innerHTML = `<div id="forms-list-container">${cardsHtml}</div><div id="student-file-preview" style="margin-top:20px;"></div>`;
}


// 다운로드 기능 (실제 서버 배포 시 경로 수정 필요)
function downloadStudentFile(folder, filename) {
    const url = `/free-forms/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 미리보기 기능 (이미지 파일만 지원)
function previewStudentFile(folder, filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const previewDiv = document.getElementById('student-file-preview');
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') {
        previewDiv.innerHTML = `<img src="/free-forms/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}" alt="${filename}" style="max-width:100%;border:1px solid #ccc;">`;
    } else {
        previewDiv.innerHTML = '<p>미리보기는 이미지 파일만 지원합니다.</p>';
    }
}

// DOMContentLoaded 시 학생 서식 파일 목록 렌더링
document.addEventListener('DOMContentLoaded', () => {
    renderStudentFiles();
});

// 검색/필터/정렬 함수
function applyFilters() {
    const searchValue = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
    const categoryValue = document.getElementById('categoryFilter')?.value || '';
    // 기존 formsData와 업로드/등록 파일 모두 검색
    const allForms = formsData.concat(getAllFormFiles());
    let filtered = allForms.filter(form => {
        const matchCategory = !categoryValue || form.category === categoryValue;
        const matchSearch = !searchValue ||
            form.title.toLowerCase().includes(searchValue) ||
            form.keywords.some(k => k.toLowerCase().includes(searchValue)) ||
            (form.fileLink && decodeURIComponent(form.fileLink).toLowerCase().includes(searchValue));
        return matchCategory && matchSearch;
    });
    filtered.sort((a, b) => b.downloads - a.downloads);
    // 무한스크롤 페이징 기능 복구
    window.filteredForms = filtered;
    window.currentPage = 1;
    renderFormsPage();
}

// 한 번에 20개씩 보여주는 페이징/무한스크롤 함수
function renderFormsPage() {
    const container = document.getElementById('forms-list-container');
    if (!window.filteredForms) return;
    const pageSize = 20;
    const startIdx = 0;
    const endIdx = window.currentPage * pageSize;
    const pageForms = window.filteredForms.slice(startIdx, endIdx);
    container.innerHTML = '';
    if (!pageForms.length) {
        container.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }
    // 다운로드 카운트 localStorage에서 불러오기
    let downloadCounts = JSON.parse(localStorage.getItem('formDownloadCounts') || '{}');
    pageForms.forEach((form, idx) => {
        // localStorage에 저장된 카운트가 있으면 반영
        if (downloadCounts[form.id] !== undefined) {
            form.downloads = downloadCounts[form.id];
        }
        const article = document.createElement('article');
        article.className = 'form-card';
        article.innerHTML = `
            <h3>${form.title}</h3>
            <p>카테고리: ${form.category}</p>
            <p class="downloads-count">다운로드: ${form.downloads}회</p>
            <button class="download-btn" data-id="${form.id}" data-title="${form.title}" data-link="${form.fileLink}">서식 즉시 다운로드</button>
        `;
        container.appendChild(article);
        if ((idx + 1) % 5 === 0) {
            const adDiv = document.createElement('div');
            adDiv.id = `adsense-feed-unit-${(idx + 1) / 5}`;
            adDiv.className = 'adsense-feed-unit';
            adDiv.innerHTML = '<!-- 여기에 구글/카카오 광고 단위 코드 삽입 --><span>ADVERTISEMENT</span>';
            container.appendChild(adDiv);
        }
    });
    container.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const formId = this.getAttribute('data-id');
            const formTitle = this.getAttribute('data-title');
            saveRecentForm(formId, formTitle);
            // 다운로드 카운트 증가 및 localStorage 저장
            let found = window.filteredForms?.find(f => f.id === formId);
            let downloadCounts = JSON.parse(localStorage.getItem('formDownloadCounts') || '{}');
            if (found) {
                found.downloads = (downloadCounts[formId] || 0) + 1;
                downloadCounts[formId] = found.downloads;
                localStorage.setItem('formDownloadCounts', JSON.stringify(downloadCounts));
                // UI 즉시 반영
                const card = this.closest('.form-card');
                if (card) {
                    const countEl = card.querySelector('.downloads-count');
                    if (countEl) countEl.textContent = `다운로드: ${found.downloads}회`;
                }
            }
            window.open(this.getAttribute('data-link'), '_blank');
        });
    });
    // 더보기 버튼 또는 무한스크롤 트리거
    if (window.filteredForms.length > endIdx) {
        let moreBtn = document.getElementById('loadMoreBtn');
        if (!moreBtn) {
            moreBtn = document.createElement('button');
            moreBtn.id = 'loadMoreBtn';
            moreBtn.textContent = '더보기';
            moreBtn.style.display = 'block';
            moreBtn.style.margin = '32px auto';
            moreBtn.onclick = function() {
                window.currentPage++;
                renderFormsPage();
            };
            container.appendChild(moreBtn);
        }
    } else {
        const moreBtn = document.getElementById('loadMoreBtn');
        if (moreBtn) moreBtn.remove();
    }
}

// 최근 본 서식 저장
function saveRecentForm(formId, formTitle) {
    let recent = JSON.parse(localStorage.getItem('recentForms') || '[]');
    // 중복 제거
    recent = recent.filter(item => item.id !== formId);
    recent.unshift({ id: formId, title: formTitle });
    if (recent.length > 10) recent = recent.slice(0, 10);
    localStorage.setItem('recentForms', JSON.stringify(recent));
    loadRecentForms();
}

// 최근 본 서식 불러오기 및 렌더링
function loadRecentForms() {
    const recent = JSON.parse(localStorage.getItem('recentForms') || '[]');
    const list = document.getElementById('recent-forms-list');
    if (!list) return;
    list.innerHTML = '';
    if (!recent.length) {
        list.innerHTML = '<li>최근 본 서식이 없습니다.</li>';
        return;
    }
    recent.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        list.appendChild(li);
    });
}

// 이벤트 리스너 및 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput')?.addEventListener('input', applyFilters);
    document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
    document.getElementById('searchBtn')?.addEventListener('click', applyFilters);
    applyFilters();
    loadRecentForms();

    // 무한스크롤 이벤트 등록
    window.addEventListener('scroll', function() {
        const container = document.getElementById('forms-list-container');
        if (!container) return;
        const moreBtn = document.getElementById('loadMoreBtn');
        if (moreBtn && moreBtn.getBoundingClientRect().top < window.innerHeight) {
            moreBtn.click();
        }
    });
});
