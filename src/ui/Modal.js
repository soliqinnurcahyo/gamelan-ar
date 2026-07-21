export function createModal(title, content) {

    const oldModal = document.getElementById("modal");

    if (oldModal) oldModal.remove();

    const modal = document.createElement("div");

    modal.id = "modal";

    modal.innerHTML = `

        <div class="modal-overlay">

            <div class="modal-content">

                <button class="modal-close">&times;</button>

                <div class="modal-header">

                    <h2>${title}</h2>

                </div>

                <div class="modal-body">

                    <p>${content}</p>

                </div>

                <div class="modal-footer">

                    <button id="closeModal">
                        Tutup
                    </button>

                </div>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    document
        .getElementById("closeModal")
        .onclick = () => modal.remove();

    document
        .querySelector(".modal-close")
        .onclick = () => modal.remove();

    document
        .querySelector(".modal-overlay")
        .onclick = (e)=>{

            if(e.target.classList.contains("modal-overlay")){

                modal.remove();

            }

        };

}