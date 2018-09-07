/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2018 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

import { Directive, Input, Renderer2, NgZone, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterViewInit } from '@angular/core';

import { ComponentMapping } from "./component-mapping";
import { Constants } from "./constants";
import { Utils } from "./utils";


const PLACEHOLDER_CLASS_NAME = 'cq-placeholder';

@Directive({
  selector: '[aemComponent]'
})

export class AEMComponentDirective implements AfterViewInit {
  private _component:ComponentRef<any>;

  @Input() cqItem:any;
  @Input() cqPath:string;
  @Input() itemName:string;
  @Input() itemAttrs: object;

  @Input() aemComponent;

  constructor(
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef,
    private factoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.renderComponent(ComponentMapping.get(this.type));
  }

  /**
   * Returns the type of the cqModel if exists.
   */
  get type() {
    return this.cqItem && this.cqItem[Constants.TYPE_PROP];
  }
  /**
   * Renders a component dynamically based on the component definition
   *
   * @param componentDefinition The component definition to render
   */
  private renderComponent(componentDefinition:any) {
    if (componentDefinition) {
      const factory = this.factoryResolver.resolveComponentFactory(componentDefinition);
      this.viewContainer.clear();
      this._component = this.viewContainer.createComponent(factory);
      this.updateComponentData();
    }
  }

  /**
   * Updates the data of the component based the data of the directive
   */
  private updateComponentData() {
    let keys = Object.getOwnPropertyNames(this.cqItem);

    keys.forEach((key) => {
        let propKey = key;

        if (propKey.startsWith(":")) {
            // Transformation of internal properties namespaced with [:] to [cq]
            // :myProperty => cqMyProperty
            let tempKey = propKey.substr(1);
            propKey = "cq" + tempKey.substr(0, 1).toUpperCase() + tempKey.substr(1);
        }

        const descriptor = Object.getOwnPropertyDescriptor(this._component.instance, propKey);

        Object.defineProperty(this._component.instance, propKey, {
          get: () => { return this.cqItem[key]; },
          set: (value) => { this.cqItem[key] = value}
        });
    });

    this._component.instance.cqPath = this.cqPath;
    this._component.instance.itemName = this.itemName;
  }

  /**
   * Adds the specified item attributes to the element
   */
  private setupItemAttrs() {
    if (this.itemAttrs) {
      let keys = Object.getOwnPropertyNames(this.itemAttrs);

      keys.forEach((key) => {
        if (key === "class") {
          let classes = this.itemAttrs[key].split(' ');
          classes.forEach((itemClass) => {
            this.renderer.addClass(this._component.location.nativeElement, itemClass);
          });
        } else {
          this.renderer.setAttribute(this._component.location.nativeElement, key , this.itemAttrs[key])
        }
      });
    }
  }

  ngAfterViewInit() {
    this.setupItemAttrs();
  }

  ngOnDestroy() {
    this._component && this._component.destroy();
  }

}
