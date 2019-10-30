import { Component, OnInit, OnDestroy } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';
import { Subscription } from "rxjs";

@Component({
  selector: "app-player",
  templateUrl: "player.component.html"
})
export class PlayerComponent implements OnInit, OnDestroy {
  public players: Player[];
  public data: any;
  private subscription: Subscription;


  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.subscription = this.apollo.query({
        query: gql`query
          {
            players{
              name,
              birthDate,
              birthPlace,
              weightLbs,
              height
            }
          }`}).subscribe(({data, loading}) => {
            this.data = data;
          });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

interface Player {
  name: string;
  birthDate: string;
  birthPlace: string;
  weightLbs: number;
}
