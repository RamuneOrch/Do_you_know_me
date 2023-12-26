import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8-pySZ4FAOax17__XxPdVkhQfmJUXL-U",
  authDomain: "teamintroduction-96907.firebaseapp.com",
  projectId: "teamintroduction-96907",
  storageBucket: "teamintroduction-96907.appspot.com",
  messagingSenderId: "419104224576",
  appId: "1:419104224576:web:b6871c556e643d8b33f6a5",
  measurementId: "G-KB6JW4NS69",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const spring = await getDocs(collection(db, "members"));

// Set the "capital" field of the city 'DC'

// 모달 입력 필드 초기화
$("#exampleModal").on("show.bs.modal", function (e) {
  $("#name").val("");
  $("#mbti").val("");
  $("#blog").val("");
  $("#comment").val("");
  $("#image").val("");
});

// 멤버 정보 저장 버튼 작동부
$("#savebtn").click(async function () {
  let name = $("#name").val();
  let mbti = $("#mbti").val();
  let blog = $("#blog").val();
  let comment = $("#comment").val();
  let image = $("#image").val();

  let doc = {
    name: name,
    mbti: mbti,
    blog: blog,
    comment: comment,
    image: image,
  };
  await addDoc(collection(db, "members"), doc);
  alert("멤버 추가 완료!");
  window.location.reload();
});

// member add
const querySnapshot = await getDocs(collection(db, "members"));
let dataLeng = querySnapshot.docs.length;

// origin member
const originMemberCard = await getDocs(collection(db, "origin"));

// origin member card

for (let i = 0; i < originMemberCard.docs.length; i++) {
  document.getElementById(
    `member${originMemberCard.docs[i].data().key}`
  ).innerHTML = `<div class="innercircle${originMemberCard.docs[i].data().key}">
    <div class="name">${originMemberCard.docs[i].data().name}</div>
    <div class="name2">${originMemberCard.docs[i].data().name2}</div>
    </div>`;
}

for (let i = 0; i < originMemberCard.docs.length; i++) {
  let key = originMemberCard.docs[i].data().key;
  document.body.innerHTML += `<div
    class="modal fade member-btn"
    id="member-detail${originMemberCard.docs[i].data().key}"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">멤버 정보</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body d-flex flex-column justify-content-center align-items-center"
        >
          <div class="detail-member">
            <div class="member-image image${key}"></div>
            <div class="member-intro">
              <div>
                <div>
                  <span
                    >이름 :
                    <span id="memberName${key}">${
    originMemberCard.docs[i].data().name
  }</span>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <span
                    >성별 :
                    <span id="sex${key}">${
    originMemberCard.docs[i].data().sex
  }</span>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <span
                    >MBTI :
                    <span id="mbti${key}">${
    originMemberCard.docs[i].data().mbti
  }</span>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <span
                    >기술 :
                    <span id="stack${key}">${
    originMemberCard.docs[i].data().stack
  }</span>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <span
                    >자기소개 한마디
                    <span id="detail-self"></span>
                  </span>
                </div>
              </div>
              <div class="member-intro-box" id="self${key}">${
    originMemberCard.docs[i].data().self
  }</div>
            </div>
          </div>
          <div class="blog">
            <div class="blog-color">
              blog :
              <a href="${originMemberCard.docs[i].data().blog}">${
    originMemberCard.docs[i].data().blog
  }</a>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="fix${
            originMemberCard.docs[i].data().key
          }" class="btn btn-primary">수정</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        </div>
      </div>
    </div>
  </div>`;
}

// modify
// 수정 버튼
// 1. 수정 버튼을 클릭하면 텍스트가 인풋태그로 바껴야됨
// 2. 완료 버튼을 클릭하면 텍스트의 내용물이 DB에 전송되면서 그 전송된 내용이 바로 페이지에 나타나야함.
let washingtonRef;
for (let i = 0; i < originMemberCard.docs.length; i++) {
  let textCheck = true;
  let backData = originMemberCard.docs[i];
  let key = backData.data().key;
  let blog = $("#blog").val();
  let img = $("#img").val();
  let mbti = backData.data().mbti;
  let name = backData.data().name;
  let name2 = $("#member-name2").val();
  let self = backData.data().self;
  let sex = backData.data().sex;
  let stack = backData.data().stack;
  let name_doc = document.getElementById(`memberName${key}`);
  let self_doc = document.getElementById(`self${key}`);
  let stack_doc = document.getElementById(`stack${key}`);
  let mbti_doc = document.getElementById(`mbti${key}`);
  $(`#fix${backData.data().key}`).click(async () => {
    washingtonRef = doc(db, "origin", `${backData.id}`);
    if (textCheck == true) {
      textCheck = false;
      console.log("수정");

      name_doc.innerHTML = `<input type="text" id="input1${key}" value="${name}">`;
      self_doc.innerHTML = `<input type="text" id="input2${key}" value="${self}">`;
      stack_doc.innerHTML = `<input type="text" id="input3${key}" value="${stack}">`;
      mbti_doc.innerHTML = `<input type="text" id="input4${key}" value="${mbti}">`;

      document.getElementById(`fix${key}`).innerText = "완료";
    } else if (textCheck == false) {
      textCheck = true;
      console.log("완료");
      document.getElementById(`fix${key}`).innerText = "수정";
      await updateDoc(washingtonRef, {
        name: `${document.getElementById(`input1${key}`).value}`,
        self: `${document.getElementById(`input2${key}`).value}`,
        stack: `${document.getElementById(`input3${key}`).value}`,
        mbti: `${document.getElementById(`input4${key}`).value}`,
      });

      name_doc.innerText = document.getElementById(`input1${key}`).value;
      self_doc.innerText = document.getElementById(`input2${key}`).value;
      stack_doc.innerText = document.getElementById(`input3${key}`).value;
      mbti_doc.innerText = document.getElementById(`input4${key}`).value;
      alert("수정되었습니다!");
      window.location.reload();

      console.log(document.getElementById(`memberName1`));
    }
  });
}
