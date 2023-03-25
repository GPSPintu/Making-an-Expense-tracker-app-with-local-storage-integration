let submit = document.getElementById('form');
submit.addEventListener('submit', addDetails);
window.addEventListener('load', loadDetails);

function addDetails(e){ 
    e.preventDefault();

    let amnt = document.getElementById('floatingInput1');
    let dec = document.getElementById('floatingInput');
    let slct = document.getElementById('floatingSelect');

    let obj = {amnt: amnt.value, dec: dec.value, slct: slct.value};
    localStorage.setItem(amnt.value, JSON.stringify(obj));

    document.getElementById('form').reset();
    showOn(obj);
}

function showOn(obj){
    let parentEle = document.getElementById('users');
    let childEle = document.createElement('li');
    childEle.textContent = obj.amnt + ' - ' + obj.dec + ' - ' + obj.slct;
    parentEle.appendChild(childEle);    

    const dltbtn = document.createElement('input');
    dltbtn.type = 'button';
    dltbtn.value = 'Delete Expense';
    dltbtn.className = 'button';
    childEle.appendChild(dltbtn);

    dltbtn.onclick = () => {
        localStorage.removeItem(obj.amnt);
        parentEle.removeChild(childEle);
    }

    const edtbtn = document.createElement('input');
    edtbtn.type = 'button';
    edtbtn.value = 'Edit Expense'
    edtbtn.className = 'button1';
    childEle.appendChild(edtbtn);

    edtbtn.onclick = () => {
        parentEle.removeChild(childEle);
        localStorage.removeItem(obj.amnt);

        document.getElementById('floatingInput1').value = obj.amnt;
        document.getElementById('floatingInput').value = obj.dec;
        document.getElementById('floatingSelect').value = obj.slct;
    }
}

function loadDetails() {
    let keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
        let obj = JSON.parse(localStorage.getItem(keys[i]));
        showOn(obj);
    }
}
