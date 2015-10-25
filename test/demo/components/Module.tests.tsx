import * as React from 'react/addons';
import Module from '../../../src/demo/components/Module';

const { TestUtils } = React.addons;

describe('Module', () => {
  let handleSelectionChangeSpy: jasmine.Spy;
  beforeEach(() => {
    handleSelectionChangeSpy = jasmine.createSpy('handleSelectionChange');
  });

  it('renders expected HTML', () => {
    const moduleName = 'some kinda module';
    const description = 'all about module';
    const module = render({ moduleName: moduleName, isSelected: true, description: description, handleSelectionChange: handleSelectionChangeSpy});

    expect(module.type).toBe('div');
    expect(module.props.className).toBe('panel panel-success');
    expect(module.props.style.cursor).toBe('pointer');

    const [ panelHeading, panelBody ] = module.props.children;
    expect(panelHeading.type).toBe('div');

    const h3 = panelHeading.props.children;
    expect(h3.type).toBe('h3');
    expect(h3.props.className).toBe('panel-title');
    expect(h3.props.children[0]).toBe(moduleName + ' ');
    expect(h3.props.children[1]).toEqual(<span className="glyphicon glyphicon-ok"></span>);

    expect(panelBody).toEqual(
      <div className="panel-body">
        { description }
      </div>
    );
  });

  function render({ moduleName, isSelected, description, handleSelectionChange}) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Module moduleName={ moduleName } isSelected={ isSelected } description={ description } handleSelectionChange={ handleSelectionChange } />);
    return shallowRenderer.getRenderOutput();
  }
});
