function ActiveLoading() {
    $('#loading').modal('show');
}

function HideLoading() {
    $('#loading').modal('hide');
}

const Loading = () => {
    let loading = php_var.loading;
    return React.createElement('div', { id:"loading", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm important-padding', style: { overflow: 'hidden', marginTop: '60px', textAlign : 'center', paddingLeft: '19px;' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement("img", { src: loading, height: "40px", style: { objectFit: 'contain' } }),
        )
    );
};