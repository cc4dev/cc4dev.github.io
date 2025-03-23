const API_URL = "https://api-7vkr.onrender.com/";

document.getElementById("tcdt-submit").addEventListener("click", () => {
    var tcdt_space = "&nbsp;&nbsp;&nbsp;";
    let tcdt_sbd = document.getElementById("tcdt-sbd").value.replace(/ /g,"");
    console.log(tcdt_sbd);
    if (tcdt_sbd === "") document.getElementById("tcdt-error-display").innerText = "Bạn chưa nhập số báo danh!";
    else
    {
        fetch(`${API_URL}thpt?sbd=${tcdt_sbd}`)
            .then(response => {
                if (response.status === 200) return response.json();
                else if (response.status === 404)
                {
                    document.getElementById("tcdt-error-display").innerText = `Không tìm thấy thí sinh nào có số báo danh ${tcdt_sbd}.`;
                    throw new Error(`Không tìm thấy thí sinh nào có số báo danh ${tcdt_sbd}.`);
                }
                else
                {
                    document.getElementById("tcdt-error-display").innerText = "Đã xãy ra lỗi, mình sẽ sửa lỗi nhanh nhất có thể!";
                    throw new Error("Đã xãy ra lỗi, mình sẽ sửa lỗi nhanh nhất có thể!");
                }
            })
            .then(data => {
                console.log(data);
                let ketqua = `SBD: ${data.sbd} </br>`;
                if (data.toan != "") ketqua += `<text> Toán: ${data.toan}${tcdt_space} </text>`;
                if (data.ngu_van != "") ketqua += `<text> Ngữ văn: ${data.ngu_van}${tcdt_space} </text>`;
                if (data.ngoai_ngu != "") ketqua += `<text> Ngoại ngữ: ${data.ngoai_ngu}${tcdt_space} </text>`;
                if (data.vat_li != "") ketqua += `<text> Vật lí: ${data.vat_li}${tcdt_space} </text>`;
                if (data.hoa_hoc != "") ketqua += `<text> Hóa học: ${data.hoa_hoc}${tcdt_space} </text>`;
                if (data.sinh_hoc != "") ketqua += `<text> Sinh học: ${data.sinh_hoc}${tcdt_space} </text>`;
                if (data.lich_su != "") ketqua += `<text> Lịch sử: ${data.lich_su}${tcdt_space} </text>`;
                if (data.dia_li != "") ketqua += `<text> Địa lí: ${data.dia_li}${tcdt_space} </text>`;
                if (data.gdcd != "") ketqua += `<text> GDCD: ${data.gdcd}${tcdt_space} </text>`;
                if (data.ma_ngoai_ngu != "") ketqua += `<text> Mã ngoại ngữ: ${data.ma_ngoai_ngu} </text>`;
                document.getElementById("tcdt-result").innerHTML += `<text> ${ketqua} </text> <hr>`;
                document.getElementById("tcdt-error-display").innerText = "";
            })
            .catch(error => {
                console.error(error.message);
            });
    }
});