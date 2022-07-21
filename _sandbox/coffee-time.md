---
title:  "Coffee Time"
name: "Coffee Time"
layout: secondary
sidebar: false
description: Calculate your coffee ratio quickly
blog: 2022/07/16/coffee-time
---

<div x-data="coffeeTime">
    <div class="row">
        <div class="col">
            <p><strong>Current Ratio (water to coffee): <span x-text="currentRatio"></span>:1</strong></p>
        </div>
    </div>
    <div class="row">
        <div class="col-12 mb-2">
            <label for="coffee">I have this much Coffee</label>
            <div class="input-group">
                <input name="coffee" id="coffee" type="number" pattern="\d*" class="form-control" x-model="coffee" x-on:change="updateAmts">
                <div class="input-group-append">
                    <span class="input-group-text">g</span>
                </div>
            </div>
        </div>
        <div class="col-12">
            <label for="water">...so I need this much Water</label>
            <div class="input-group">
                <h4><span x-text="water"></span>g</h4>
            </div>
        </div>
    </div>
    <hr>
    <div class="form-group">
        <label for="method">How you brewing?</label>
        <select name="method" id="method" type="number" class="form-control" x-model="currentRatio" x-on:change="setRatio">
            <option value="15.13">Pourover (15.13:1 ratio)</option>
            <option value="12">French Press (12:1 ratio)</option>
        </select>
    </div>
    <div class="form-group">
        <label for="modifiers">Ratio Modifier</label>
        <select class="form-control" name="modifiers" id="modifiers" x-on:change="modifyRatio">
            <option value="1">Recommended</option>
            <option value="1.1">Weak Coffee (10% more water)</option>
            <option value=".9">Strong Coffee (10% less water)</option>
        </select>
    </div>
<script>
      const modifiers = document.getElementById('modifiers');
      window.coffeeTime = function () {
        return {
            coffee: 0,
            water: 0,
            currentRatio: 0,
            units: 'm',
            setRatio(e) {
                this.currentRatio = e.target.value;
                this.recalcAmts();
            },
            recalcAmts(r = this.currentRatio) {
                this.water = (this.coffee * r).toFixed(0);
            },
            updateAmts(e) {
                // when one or the other changes, update it
                // first get the ratio; account for modifier
                let r = this.currentRatio * modifiers.value;
                // coffee was updated, so change water
                this.water = Math.ceil(this.coffee * r);
            },
            modifyRatio(e) {
                let ratioMod = e.target.value;
                this.recalcAmts(this.currentRatio * ratioMod);
            },
            getRatio(water, coffee) {
                return (this.water / this.coffee).toFixed(2);
            },
            getRatioString(water = this.water, coffee = this.coffee) {
                let r = this.getRatio(water, coffee)
                return `${r}:1`;
            },
            init() {
                this.water = 454.0;
                this.coffee = 30.0;
                this.currentRatio = this.getRatio(this.water, this.coffee);
            }
        }
      };
</script>