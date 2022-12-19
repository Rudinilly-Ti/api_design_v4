import { randomUUID } from "node:crypto";
import { Replace } from "../../../helpers/Replace";

export interface UpdatePointProps {
  name: string;
  description: string;
  updateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdatePoint {
  private _id: string;
  private props: UpdatePointProps;

  constructor(
    props: Replace<UpdatePointProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
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

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get updateId(): string {
    return this.props.updateId;
  }

  public set updateId(updateId: string) {
    this.props.updateId = updateId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
