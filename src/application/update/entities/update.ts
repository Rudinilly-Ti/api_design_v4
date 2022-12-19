import { randomUUID } from "node:crypto";
import { Replace } from "@helpers/Replace";
import { UpdatePoint } from "../../update-point/entities/update-point";

export enum UPDATE_STATUS {
  IN_PROGRESS,
  SHIPPED,
  DEPRECATED,
}

export interface UpdateProps {
  title: string;
  body: string;
  status: UPDATE_STATUS;
  productId: string;
  version?: string | null;
  asset?: string | null;
  createdAt: Date;
  updatedAt: Date;
  updatePoints: UpdatePoint[];
}

export class Update {
  private _id: string;
  private props: UpdateProps;

  constructor(
    props: Replace<
      UpdateProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        status?: UPDATE_STATUS;
        updatePoints?: UpdatePoint[];
      }
    >,
    id?: string
  ) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      status: props.status ?? UPDATE_STATUS.IN_PROGRESS,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      updatePoints: props.updatePoints ?? [],
    };
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get body(): string {
    return this.props.body;
  }

  public set body(body: string) {
    this.props.body = body;
  }

  public get status(): UPDATE_STATUS {
    return this.props.status;
  }

  public set status(status: UPDATE_STATUS) {
    this.props.status = status;
  }

  public get productId(): string {
    return this.props.productId;
  }

  public get version(): string | null | undefined {
    return this.props.version;
  }

  public set version(version: string | null | undefined) {
    this.props.version = version;
  }

  public get asset(): string | null | undefined {
    return this.props.asset;
  }

  public set asset(asset: string | null | undefined) {
    this.props.asset = asset;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get updatePoints(): UpdatePoint[] {
    return this.props.updatePoints;
  }

  public set updatePoints(updatePoints: UpdatePoint[]) {
    this.props.updatePoints = updatePoints;
  }
}
