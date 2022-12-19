import { Replace } from "@helpers/Replace";
import { randomUUID } from "node:crypto";
import { Product } from "../../product/entities/product";

export interface UserProps {
  username: string;
  password: string;
  products: Product[];
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; products?: Product[] }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      products: props.products ?? [],
    };
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get username(): string {
    return this.props.username;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get password(): string {
    return this.props.password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get products(): Product[] {
    return this.props.products;
  }

  public set products(products: Product[]) {
    this.props.products = products;
  }
}
