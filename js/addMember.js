import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8-pySZ4FAOax17__XxPdVkhQfmJUXL-U",
    authDomain: "teamintroduction-96907.firebaseapp.com",
    projectId: "teamintroduction-96907",
    storageBucket: "teamintroduction-96907.appspot.com",
    messagingSenderId: "419104224576",
    appId: "1:419104224576:web:b6871c556e643d8b33f6a5",
    measurementId: "G-KB6JW4NS69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 모달 입력 필드 초기화
$('#exampleModal').on('show.bs.modal', function (e) {
    $('#name').val('');
    $('#mbti').val('');
    $('#blog').val('');
    $('#comment').val('');
    $('#image').val('');
});


// 멤버 정보 저장 버튼 작동부
$("#savebtn").click(async function () {
    let name = $('#name').val();
    let mbti = $('#mbti').val();
    let blog = $('#blog').val();
    let comment = $('#comment').val();
    let image = $('#image').val();

    let doc = {
        'name': name,
        'mbti': mbti,
        'blog': blog,
        'comment': comment,
        'image': image

    };
    await addDoc(collection(db,  "members"), doc);
    alert('멤버 추가 완료!');
    window.location.reload();
})