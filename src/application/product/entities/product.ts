import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";
import { Update } from "../../update/entities/update";

export interface ProductProps {
  name: string;
  belongsToId: string;
  updates: Update[];
  createdAt: Date;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(
    props: Replace<ProductProps, { createdAt?: Date; updates?: Update[] }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updates: props.updates ?? [],
    };
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get belongsToId(): string {
    return this.props.belongsToId;
  }

  public set belongsToId(belongsToId: string) {
    this.props.belongsToId = belongsToId;
  }

  public get updates(): Update[] {
    return this.props.updates;
  }

  public set updates(updates: Update[]) {
    this.props.updates = updates;
  }
}
