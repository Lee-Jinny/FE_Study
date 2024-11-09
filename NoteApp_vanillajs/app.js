// 데이터 저장 및 가져오기
const saveNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes));

const getSavedNotes = () => {
    const noteJSON = localStorage.getItem('notes');
    try {
        return noteJSON ? JSON.parse(noteJSON) : [];
    } catch (error) {
        return [];
    }
};

let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byEdited',
};

// 노트 렌더링
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes');
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter((note) => 
        note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    );
    
    notesEl.innerHTML = '';

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = document.createElement('a');
            noteEl.className = 'list-group-item list-group-item-action';
            noteEl.setAttribute('href', `create.html#${note.id}`);
            noteEl.textContent = note.title || "Unnamed note";
            notesEl.appendChild(noteEl);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "No result";
        emptyMessage.classList.add('empty-message');
        notesEl.appendChild(emptyMessage);
    }
};

// 노트 정렬 함수
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => b.updatedAt - a.updatedAt);
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        return notes;
    }
};

// 노트 생성
document.querySelector('#create-note').addEventListener('click', () => {
    const id = uuidv4();
    const timestamp = moment().valueOf();
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp,
    });
    saveNotes(notes);
    location.assign(`create.html#${id}`);
});

// 검색 및 정렬 이벤트
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

// 노트 편집 페이지 로직
const noteId = location.hash.substring(1);
let note = notes.find((note) => note.id === noteId);

if (note) {
    document.querySelector('#note-title').value = note.title;
    document.querySelector('#note-body').value = note.body;
    document.querySelector('#last-edited').textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
}

// document.querySelector('#save-note').addEventListener('click', () => {
//     if (note) {
//         note.title = document.querySelector('#note-title').value;
//         note.body = document.querySelector('#note-body').value;
//         note.updatedAt = moment().valueOf();
//         saveNotes(notes);
//         location.assign('index.html');
//     }
// });

const saveButton = document.querySelector('#save-note');
if (saveButton) {
    saveButton.addEventListener('click', () => {
        if (note) {
            note.title = document.querySelector('#note-title').value;
            note.body = document.querySelector('#note-body').value;
            note.updatedAt = moment().valueOf();
            saveNotes(notes);
            location.assign('index.html');
        }
    });
}

// 노트 삭제 기능
document.querySelector('#remove-note').addEventListener('click', () => {
    notes = notes.filter((note) => note.id !== noteId);
    saveNotes(notes);
    location.assign('index.html');
});

// 초기 렌더링 호출
renderNotes(notes, filters);
