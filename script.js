const menu = [
  {name: "Paneer Butter Masala", price: 180, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"},
  {name: "Veg Biryani", price: 150, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"},
  {name: "idli", price: 90, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc"},
  {name: "Cold Coffee", price: 80, img: "https://images.unsplash.com/photo-1511920170033-f8396924c348"},
  {name: "Pizza", price: 200, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65"},
  {name: "Burger", price: 120, img: "https://images.unsplash.com/photo-1550547660-d9450f859349"},
  {name: "French Fries", price: 70, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"},
  {name: "Ice Cream", price: 60, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb"}
];

let cartData=[]; let total=0;

const menuList=document.getElementById("menuList");

menu.forEach((item,index)=>{
  let div=document.createElement("div");
  div.className="item";
  div.innerHTML=`
    <img src="${item.img}?auto=format&fit=crop&w=300&q=80">
    <h3>${item.name}</h3>
    <p>₹${item.price}</p>
    <button onclick="addToCart(${index})">Add</button>`;
  menuList.appendChild(div);
});

function addToCart(index){
  let item=menu[index];
  let existing=cartData.find(i=>i.name===item.name);

  if(existing){existing.qty++;}
  else{cartData.push({...item,qty:1});}

  updateCart();

  document.querySelector(".cart").style.right="0";
}

function removeItem(name){
  cartData=cartData.filter(item=>item.name!==name);
  updateCart();
}

function updateCart(){
  const cart=document.getElementById("cartItems");
  cart.innerHTML="";
  total=0;

  cartData.forEach(item=>{
    total+=item.price*item.qty;

    let li=document.createElement("li");
    li.innerHTML=`
      ${item.name} x${item.qty} - ₹${item.price*item.qty}
      <button onclick="removeItem('${item.name}')">❌</button>`;
    cart.appendChild(li);
  });

  document.getElementById("total").innerText="Total: ₹"+total;
}

function closeCart(){
  document.querySelector(".cart").style.right="-300px";
}

function openOrder(){
  if(cartData.length===0){alert("Cart empty");return;}
  document.getElementById("orderPopup").style.display="block";
}

function closeOrder(){
  document.getElementById("orderPopup").style.display="none";
}

function confirmOrder(){
  closeOrder();
  startTracking();
}

function startTracking(){
  let div=document.createElement("div");
  div.className="tracking";
  document.body.appendChild(div);

  let steps=["Preparing","On the way","Delivered"];
  let i=0;

  div.innerHTML="<h3>"+steps[i]+"</h3>";

  let interval=setInterval(()=>{
    i++;
    if(i<steps.length){
      div.innerHTML="<h3>"+steps[i]+"</h3>";
    }else{
      clearInterval(interval);
      cartData=[];
      updateCart();
    }
  },3000);
}

function scrollToMenu(){
  document.getElementById("menu").scrollIntoView({behavior:"smooth"});
}

function openLogin(){
  document.getElementById("loginModal").style.display="block";
}

function closeLogin(){
  document.getElementById("loginModal").style.display="none";
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");
}
