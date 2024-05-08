// Simula um banco de dados em memória
var clientes = []
// Guarda objeto que está sendo alterado
var clienteAlterado = null

function adicionar() {
    mostrarModal()
    limparForm()
    clienteAlterado = null
    document.getElementById("cpf").disabled = false

}

function alterar(cpf) {
    // Procurara o cliente que tem o cpf clicado no alterar
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i]
        if (cliente.cpf == cpf) {
            // Achou cliente, então preenche o form
            document.getElementById("nome").value = cliente.nome
            document.getElementById("cpf").value = cliente.cpf
            document.getElementById("telefone").value = cliente.telefone
            document.getElementById("chinelo").value = cliente.chinelo
            document.getElementById("cpfmae").value = cliente.cpfmae
            clienteAlterado = cliente
        }
    }
    // Bloquear o cpf para não permitir alterá-lo
    document.getElementById("cpf").disabled = true
    mostrarModal()
}

function excluir(cpf) {
    if (confirm("Você deseja realmente excluir?")) {
        for (let i = 0; i < clientes.length; i++) {
            let cliente = clientes[i]
            if (cliente.cpf == cpf) {
                // Remove o elemente encontrado na posição "i"
                clientes.splice(i, 1)
            }
        }
        exibirDados()
    }
}

function mostrarModal() {
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "flex"
}

function ocultarModal() {
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "none"
}

function cancelar() {
    ocultarModal()
    limparForm()
}

function salvar() {
    let nome = document.getElementById("nome").value
    let cpf = document.getElementById("cpf").value
    let telefone = document.getElementById("telefone").value
    let chinelo = document.getElementById("chinelo").value
    let cpfmae = document.getElementById("cpfmae").value
    // Se não estiver alterando alguém, adiciona no vetor
    if (clienteAlterado == null) {
        let cliente = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "chinelo": chinelo,
            "cpfmae": cpfmae
        }
        // Adiciona o objeto cliente no vetor de clientes
        clientes.push(cliente)
    } else {
        clienteAlterado.nome = nome
        clienteAlterado.cpf = cpf
        clienteAlterado.telefone = telefone
        clienteAlterado.chinelo = chinelo
        clienteAlterado.cpfmae = cpfmae
    }
    // Retorna a variável global clienteAlterado a null
    clienteAlterado = null
    // Libera para digitar o cpf
    document.getElementById("cpf").disabled = false
    limparForm()
    ocultarModal()
    exibirDados()
}

function exibirDados() {
    let tbody = document.querySelector("#table-customers tbody")
    // Antes de listar todos clientes, limpar todas as linhas
    tbody.innerHTML = ""
    for (let i = 0; i < clientes.length; i++) {
        let linha = `
            <tr>
                <td>${clientes[i].nome}</td>
                <td>${clientes[i].cpf}</td>
                <td>${clientes[i].telefone}</td>
                <td>${clientes[i].chinelo}</td>
                <td>${clientes[i].cpfmae}</td>
                <td>
                    <button onclick="alterar('${clientes[i].cpf}')" class="botao-alterar">Alterar</button>
                    <button onclick="excluir('${clientes[i].cpf}')" class="botao-excluir">Excluir</button>
                </td>
            </tr>
        `
        let tr = document.createElement("tr")
        tr.innerHTML = linha
        tbody.appendChild(tr)
    }
}

function limparForm() {
    document.getElementById("nome").value = ""
    document.getElementById("cpf").value = ""
    document.getElementById("telefone").value = ""
    document.getElementById("chinelo").value = ""
    document.getElementById("cpfmae").value = ""
}
