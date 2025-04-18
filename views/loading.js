function ActiveLoading() {
    let loadingClass = document.getElementById('loadingModalShowWhile');
    if (Boolean(loadingClass)) {
        loadingClass.classList.replace('hide', 'show');
        return;        
    }
}

function HideLoading() {
    let loadingClass = document.getElementById('loadingModalShowWhile'); 
    if (Boolean(loadingClass)) {
        loadingClass.classList.replace('show', 'hide');
        return;
    }
}

const Loading = () => {
    let loading = php_var.loading;
    return React.createElement('div', { id:"loadingModalShowWhile", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm important-padding show modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
            React.createElement("img", { src: loading, height: "40px", style: { objectFit: 'contain' } }),
        )
    );
};