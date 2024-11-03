class Asset {
  name: string
  price: number
  symbol: string

  constructor(symbol: string, name: string, price: number) {
    this.symbol = symbol;
    this.name = name;
    this.price = price;
  }
}

export { Asset };