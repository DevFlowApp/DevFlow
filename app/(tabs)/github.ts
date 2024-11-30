function loginGithub() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(resposta => {
            console.log('Usuário:', resposta.user);
            console.log('Token:', resposta.credential.accessToken);
        })
        .catch(erro => {
            console.log('Erro:', erro);
        });
}
