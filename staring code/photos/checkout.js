
const STORAGE_KEY = 'megapark_cart'
function loadCart(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch(e){return []}}
function saveCart(cart){localStorage.setItem(STORAGE_KEY,JSON.stringify(cart))}

const itemsEl = document.getElementById('checkout-items')
const totalEl = document.getElementById('checkout-total')
let cart = loadCart()

function render(){
  itemsEl.innerHTML = ''
  if(cart.length===0){ itemsEl.innerHTML = '<p>Your cart is empty. <a href="index.html">Continue shopping</a></p>'; totalEl.textContent='0'; return }
  let total = 0
  cart.forEach((it,idx)=>{
    total += it.price*it.qty
    const row = document.createElement('div')
    row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginTop='8px'
    row.innerHTML = `<div>${it.name} <small style="color:var(--muted)">(${it.kind})</small></div>
      <div style="display:flex;gap:8px;align-items:center"><button data-idx="${idx}" class="small dec">−</button><span>${it.qty}</span><button data-idx="${idx}" class="small inc">+</button><strong>KES ${it.price*it.qty}</strong></div>`
    itemsEl.appendChild(row)
  })
  totalEl.textContent = total
}

itemsEl.addEventListener('click',e=>{
  if(e.target.matches('.inc')){
    const i = Number(e.target.dataset.idx); cart[i].qty++; saveCart(cart); render();
  }
  if(e.target.matches('.dec')){
    const i = Number(e.target.dataset.idx); cart[i].qty = Math.max(0, cart[i].qty-1); if(cart[i].qty===0) cart.splice(i,1); saveCart(cart); render();
  }
})

document.getElementById('checkout-form').addEventListener('submit',e=>{
  e.preventDefault(); alert('Details saved locally. Press Place Order to complete.')
})

document.getElementById('place-order').addEventListener('click',()=>{
  if(cart.length===0) return alert('Cart is empty')
  // simulate sending order
  saveCart([])
  window.location.href = 'confirmation.html'
})

render()
